import os
import re
import uuid
import logging
import requests
import instaloader
import yt_dlp

DOWNLOAD_DIR = "downloads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Instaloader konteksti (avtomatik yuklamaydigan qilib)
loader = instaloader.Instaloader(
    download_pictures=False,
    download_videos=False,
    download_video_thumbnails=False,
    download_geotags=False,
    download_comments=False,
    save_metadata=False,
    compress_json=False,
    quiet=True
)

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/124.0.0.0 Safari/537.36'
    )
}

def extract_shortcode(url: str) -> str:
    match = re.search(r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)', url)
    return match.group(1) if match else None

def download_file(media_url: str, ext: str) -> str:
    file_id = str(uuid.uuid4())
    file_path = os.path.join(DOWNLOAD_DIR, f"{file_id}.{ext}")
    resp = requests.get(media_url, headers=HEADERS, stream=True, timeout=30)
    resp.raise_for_status()
    with open(file_path, 'wb') as f:
        for chunk in resp.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    return file_path

def download_instagram_media(url: str) -> dict:
    """
    Instagram havolasidan video, rasm yoki karuselni yuklab oladi.
    Qaytaradi:
    {
        'type': 'video' | 'photo' | 'media_group',
        'items': [{'type': 'video'|'photo', 'file_path': str}],
        'caption': str
    }
    """
    shortcode = extract_shortcode(url)
    
    # 1. Instaloader orqali tekshirish
    if shortcode:
        try:
            post = instaloader.Post.from_shortcode(loader.context, shortcode)
            caption = post.caption or ""
            if len(caption) > 300:
                caption = caption[:297] + "..."

            # Karusel (bir nechta rasm/video)
            if post.typename == 'GraphSidecar':
                items = []
                for node in post.get_sidecar_nodes():
                    if node.is_video and node.video_url:
                        fpath = download_file(node.video_url, 'mp4')
                        items.append({'type': 'video', 'file_path': fpath})
                    elif node.display_url:
                        fpath = download_file(node.display_url, 'jpg')
                        items.append({'type': 'photo', 'file_path': fpath})
                
                if items:
                    return {
                        'type': 'media_group',
                        'items': items,
                        'caption': caption
                    }

            # Bitta video (Reels / Post video)
            if post.is_video and post.video_url:
                fpath = download_file(post.video_url, 'mp4')
                return {
                    'type': 'video',
                    'file_path': fpath,
                    'caption': caption
                }

            # Bitta rasm (GraphImage)
            if post.url:
                fpath = download_file(post.url, 'jpg')
                return {
                    'type': 'photo',
                    'file_path': fpath,
                    'caption': caption
                }

        except Exception as inst_err:
            logging.warning(f"Instaloader orqali yuklashda xatolik: {inst_err}, yt-dlp ga o'tilmoqda...")

    # 2. Zaxira (fallback): yt-dlp orqali yuklash
    file_id = str(uuid.uuid4())
    output_template = os.path.join(DOWNLOAD_DIR, f"{file_id}.%(ext)s")

    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'outtmpl': output_template,
        'quiet': True,
        'no_warnings': True,
        'merge_output_format': 'mp4',
        'max_filesize': 50 * 1024 * 1024,
        'http_headers': HEADERS
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        if 'entries' in info and info['entries']:
            info = info['entries'][0]

        filename = ydl.prepare_filename(info)
        base, _ = os.path.splitext(filename)
        mp4_filename = f"{base}.mp4"
        final_file = mp4_filename if os.path.exists(mp4_filename) else filename

        if not os.path.exists(final_file):
            raise FileNotFoundError("Video fayli topilmadi.")

        caption = info.get('description') or info.get('title') or ""
        if len(caption) > 300:
            caption = caption[:297] + "..."

        return {
            'type': 'video',
            'file_path': final_file,
            'caption': caption
        }
