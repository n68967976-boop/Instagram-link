# Instagram Video Downloader Telegram Bot 🤖📥

Ushbu bot Instagram ijtimoiy tarmog'idan Reels, Post va Video havolalarini qabul qilib, ularni foydalanuvchiga to'g'ridan-to'g'ri Telegram video formatida yuklab beradi.

---

## 📁 Loyiha tarkibi
- `main.py` — Botning asosiy boshqaruv kodi (aiogram 3 kutubxonasida yozilgan).
- `downloader.py` — Instagramdan videoni yuklab oluvchi modul (yt-dlp asosida).
- `requirements.txt` — Kerakli Python kutubxonalari ro'yxati.
- `.env` — Bot tokeni saqlanadigan konfiguratsiya fayli.

---

## 🚀 O'rnatish va Ishga tushirish

### 1-qadam: Python o'rnatilganligini tekshirish
Kompyuteringizda Python (3.10 yoki undan yuqori versiya) o'rnatilgan bo'lishi kerak.
Agar o'rnatilmagan bo'lsa:
1. [python.org](https://www.python.org/downloads/) saytiga kiring va yuklab oling.
2. O'rnatish jarayonida **"Add Python to PATH"** katakchasiga albatta belgi (galochka) qo'ying!

### 2-qadam: Telegram Bot Tokenini olish
1. Telegramda [@BotFather](https://t.me/BotFather) botiga kiring.
2. `/newbot` buyrug'ini yuboring va ko'rsatmalarga asosan botga nom va username bering.
3. Sizga berilgan API tokenni nusxalab oling (masalan: `7123456789:AAH...`).

### 3-qadam: Tokenni `.env` fayliga kiritish
Loyiha papkasidagi `.env` faylini oching va tokenni yozing:
```env
BOT_TOKEN=bu_yerga_sizning_tokeningiz
```

### 4-qadam: Kerakli kutubxonalarni o'rnatish
Terminal (yoki buyruqlar satri - CMD / PowerShell) ochib, quyidagi buyruqni bajaring:
```bash
pip install -r requirements.txt
```

### 5-qadam: Botni ishga tushirish
```bash
python main.py
```

---

## ⚡ Qanday ishlaydi?
1. Foydalanuvchi botga Instagram video/reel havolasini yuboradi.
2. Bot havolani aniqlaydi va yuklashni boshlaydi.
3. Video yuklab olingach, uni MP4 formatida foydalanuvchiga yuboradi.
4. Xotirani tejash maqsadida yuklangan fayl serverdan avtomatik tarzda o'chiriladi.

⚠️ **Muhim eslatma:** Faqat ochiq (public) profillardagi videolarni yuklash mumkin. Yopiq (private) profillardan video yuklash uchun Instagram login/cookies talab etiladi.
