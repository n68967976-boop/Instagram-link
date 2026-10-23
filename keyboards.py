from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

def get_main_keyboard() -> ReplyKeyboardMarkup:
    kb = [
        [
            KeyboardButton(text="🤖 AI Chat"),
            KeyboardButton(text="📥 Instagram Yuklovchi")
        ],
        [
            KeyboardButton(text="ℹ️ Yordam")
        ]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)

def get_ai_keyboard() -> ReplyKeyboardMarkup:
    kb = [
        [
            KeyboardButton(text="🗑 Tarixni tozalash"),
            KeyboardButton(text="🔙 Asosiy menyu")
        ]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)
