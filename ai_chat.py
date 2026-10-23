import os
import requests
import logging
from typing import Dict, List
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-3.5-flash"

# Har bir foydalanuvchi uchun suhbat tarixi (context memory)
user_conversations: Dict[int, List[dict]] = {}

SYSTEM_INSTRUCTION = (
    "Sen aqlli, muloyim va har tomonlama bilimdon Google Gemini sun'iy intellekt yordamchisisan. "
    "Foydalanuvchi savollariga to'liq, aniq va tushunarli qilib javob ber. "
    "Foydalanuvchi qaysi tilda yozsa, shu tilda javob qaytar (asosan o'zbek tilida). "
    "Javoblaringda kerak bo'lganda chiroyli formatlashdan (qalin matn, ro'yxatlar, kod bloklari) foydalan."
)

def clear_user_history(user_id: int):
    """Foydalanuvchining suhbat tarixini tozalash"""
    if user_id in user_conversations:
        user_conversations[user_id] = []

def ask_ai(user_id: int, user_message: str) -> str:
    """
    Google Gemini AI orqali foydalanuvchi savoliga javob qaytaradi.
    Suhbat konteksti (tarixi) saqlanadi.
    """
    if user_id not in user_conversations:
        user_conversations[user_id] = []

    history = user_conversations[user_id]

    # Xotira juda uzayib ketmasligi uchun oxirgi 10 ta replikani saqlaymiz
    if len(history) > 10:
        history = history[-10:]
        user_conversations[user_id] = history

    # Gemini formati bo'yicha contents ro'yxatini tuzamiz
    contents = []
    for item in history:
        contents.append({
            "role": item["role"],
            "parts": [{"text": item["text"]}]
        })

    # Joriy savolni qo'shamiz
    contents.append({
        "role": "user",
        "parts": [{"text": user_message}]
    })

    # 1. Asosiy: Google Gemini API orqali so'rov
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "system_instruction": {
                    "parts": [{"text": SYSTEM_INSTRUCTION}]
                },
                "contents": contents
            }
            resp = requests.post(url, json=payload, timeout=25)
            if resp.status_code == 200:
                data = resp.json()
                reply_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()

                # Muvaffaqiyatli bo'lsa tarixga yozamiz
                history.append({"role": "user", "text": user_message})
                history.append({"role": "model", "text": reply_text})
                return reply_text
            else:
                logging.warning(f"Gemini API xatosi ({resp.status_code}): {resp.text}")
        except Exception as gemini_err:
            logging.error(f"Gemini chaqirishda xatolik: {gemini_err}")

    # 2. Zaxira (fallback) bepul AI
    try:
        messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
        for item in history:
            role = "user" if item["role"] == "user" else "assistant"
            messages.append({"role": role, "content": item["text"]})
        messages.append({"role": "user", "content": user_message})

        res = requests.post(
            "https://text.pollinations.ai/",
            json={"messages": messages, "model": "openai", "seed": 42},
            timeout=25
        )
        if res.status_code == 200 and res.text.strip():
            reply_text = res.text.strip()
            history.append({"role": "user", "text": user_message})
            history.append({"role": "model", "text": reply_text})
            return reply_text
    except Exception as fallback_err:
        logging.error(f"Zaxira AI xatosi: {fallback_err}")

    return "⚠️ Hozirda sun'iy intellekt javob bera olmadi. Iltimos, birozdan so'ng qayta urinib ko'ring."
