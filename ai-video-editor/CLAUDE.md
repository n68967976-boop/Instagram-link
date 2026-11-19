# AI Video Editor

Sen mening video muharririmsan. Bu papka montaj uchun ish joyi.

## Papkalar
- `raw-footage/`: xom videolar (montaj qilinadigan material)
- `references/`: yoqqan stildagi 3–5 ta video (ilhom uchun, nusxa ko'chirma)
- `exports/`: tayyor videolar
- `src/`: Remotion kompozitsiyalari (motion grafika, titrlar)

## Asboblar (5 ta)
| Asbob | Vazifasi | Buyruq |
|---|---|---|
| FFmpeg | kesish, jimlikni olib tashlash, birlashtirish | `ffmpeg` |
| Whisper | so'zlarni tanib, subtitr yozish | `.venv/bin/python` + `faster_whisper` |
| yt-dlp | referens videolarni yuklash | `.venv/bin/yt-dlp <url> -o references/%(id)s.%(ext)s` |
| Remotion | React bilan motion grafika | `npm run studio` / `npm run render` |
| HyperFrames | HTML bilan motion grafika | `npx hyperframes init <nom>` / `npx hyperframes render <nom>` |

## O'rnatish (yangi kompyuterda)
```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
npm install
# ffmpeg: macOS `brew install ffmpeg`, Windows `winget install ffmpeg`, Linux `apt install ffmpeg`
```

## Montaj tartibi
1. `references/` dagi videolarni ko'rib, stilni aniqla: tezlik, kesish ritmi, subtitr ko'rinishi, ranglar, musiqa. Nusxa ko'chirma, faqat ilhom ol.
2. `raw-footage/` dagi videoni Whisper bilan transkript qil.
3. FFmpeg bilan jimlik va bo'sh joylarni kes (`silencedetect`), lekin hikoyani saqla.
4. Subtitr qo'sh, kerak bo'lsa Remotion/HyperFrames bilan motion grafika (hook, titrlar) yasa.
5. Natijani `exports/` ga 1080x1920 (Reels) formatida chiqar.
6. Foydalanuvchi oddiy so'z bilan tuzatish so'raydi ("hookni kattaroq qil"), sen o'zing tuzatasan.

Xato chiqsa, o'zing tuzat va qayta sinab ko'r.
