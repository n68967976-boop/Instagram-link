import os
import re
import asyncio
import logging
from dotenv import load_dotenv

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart, Command
from aiogram.types import FSInputFile, InputMediaPhoto, InputMediaVideo
from aiogram.enums import ChatAction
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

from downloader import download_instagram_media
from ai_chat import ask_ai, clear_user_history
from keyboards import get_main_keyboard, get_ai_keyboard

load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")

if not BOT_TOKEN or BOT_TOKEN == "bu_yerga_tokeningizni_yozing":
    print("XATOLIK: .env faylida BOT_TOKEN ko'rsatilmagan!")

logging.basicConfig(level=logging.INFO)

bot = Bot(token=BOT_TOKEN if BOT_TOKEN else "DUMMY_TOKEN")
dp = Dispatcher()

# Foydalanuvchi holatlari
class BotStates(StatesGroup):
    ai_chat = State()

# Instagram havolalarini aniqlash regexi
INSTAGRAM_PATTERN = re.compile(
    r'(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|reels|tv)\/[\w-]+)',
    re.IGNORECASE
)


@dp.message(CommandStart())
async def send_welcome(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer(
        "👋 **Assalomu alaykum!**\n\n"
        "Men quyidagi imkoniyatlarga egaman:\n"
        "📥 **Instagram Yuklovchi** — Instagram video, reel va rasmlarini yuklab beraman.\n"
        "🤖 **AI Chat** — Sun'iy intellekt bilan istalgan mavzuda suhbatlashish va savollaringizga javob olishingiz mumkin.\n\n"
        "Pastdagi tugmalardan kerakli bo'limni tanlang:",
        reply_markup=get_main_keyboard(),
        parse_mode="Markdown"
    )


@dp.message(Command("help"))
@dp.message(F.text == "ℹ️ Yordam")
async def send_help(message: types.Message):
    await message.answer(
        "📌 **Bot qo'llanmasi:**\n\n"
        "1. 📥 **Instagramdan yuklash:**\n"
        "   Instagram ilovasidagi havola (link)ni botga yuboring. Bot uni video yoki rasm sifatida yuklab beradi.\n\n"
        "2. 🤖 **AI Chat:**\n"
        "   '🤖 AI Chat' tugmasini bosing va sun'iy intellektga istalgan savolingizni bering (dasturlash, maslahatlar, fan, insholar va h.k.).\n\n"
        "⚠️ *Eslatma:* Faqat ochiq (public) Instagram profillaridagi mediani yuklab olish mumkin.",
        parse_mode="Markdown"
    )


@dp.message(F.text == "🤖 AI Chat")
@dp.message(Command("ai"))
async def enter_ai_chat(message: types.Message, state: FSMContext):
    await state.set_state(BotStates.ai_chat)
    await message.answer(
        "🤖 **AI Chat bo'limiga xush kelibsiz!**\n\n"
        "Menga istalgan savolingizni yozing — men sizga javob berishga tayyorman! 💡\n\n"
        "*(Asosiy menyuga qaytish uchun '🔙 Asosiy menyu' tugmasini bosing)*",
        reply_markup=get_ai_keyboard(),
        parse_mode="Markdown"
    )


@dp.message(F.text == "🔙 Asosiy menyu")
async def exit_to_main_menu(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer(
        "🏠 Asosiy menyudasiz. Kerakli bo'limni tanlang:",
        reply_markup=get_main_keyboard()
    )


@dp.message(F.text == "🗑 Tarixni tozalash")
async def clear_history(message: types.Message, state: FSMContext):
    clear_user_history(message.from_user.id)
    await message.answer(
        "🧹 AI bilan suhbat tarixingiz tozalandi! Yangi mavzuda savol berishingiz mumkin.",
        reply_markup=get_ai_keyboard()
    )


@dp.message(F.text == "📥 Instagram Yuklovchi")
async def instagram_section(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer(
        "📥 **Instagram Yuklovchi:**\n\n"
        "Instagram'dan yuklamoqchi bo'lgan video, reel yoki post havolasini yuboring!",
        reply_markup=get_main_keyboard(),
        parse_mode="Markdown"
    )


# Instagram havolasini qayta ishlash yordamchi funksiyasi
async def process_instagram_url(message: types.Message, url: str):
    status_msg = await message.reply("⏳ Media yuklab olinmoqda, iltimos kuting...")
    await bot.send_chat_action(chat_id=message.chat.id, action=ChatAction.UPLOAD_VIDEO)

    files_to_clean = []
    try:
        result = await asyncio.to_thread(download_instagram_media, url)
        m_type = result.get('type')
        caption = result.get('caption', '')
        bot_user = (await bot.get_me()).username
        full_caption = f"{caption}\n\n🤖 @{bot_user}" if caption else f"🤖 @{bot_user}"

        if m_type == 'video':
            fpath = result['file_path']
            files_to_clean.append(fpath)
            await message.answer_video(
                video=FSInputFile(fpath),
                caption=full_caption,
                supports_streaming=True
            )

        elif m_type == 'photo':
            fpath = result['file_path']
            files_to_clean.append(fpath)
            await message.answer_photo(
                photo=FSInputFile(fpath),
                caption=full_caption
            )

        elif m_type == 'media_group':
            items = result.get('items', [])
            media_list = []
            for idx, item in enumerate(items[:10]):
                fpath = item['file_path']
                files_to_clean.append(fpath)
                item_cap = full_caption if idx == 0 else None
                if item['type'] == 'video':
                    media_list.append(InputMediaVideo(media=FSInputFile(fpath), caption=item_cap))
                else:
                    media_list.append(InputMediaPhoto(media=FSInputFile(fpath), caption=item_cap))

            if media_list:
                await message.answer_media_group(media=media_list)

        await status_msg.delete()

    except Exception as e:
        logging.error(f"Yuklashda xatolik: {e}")
        await status_msg.edit_text(
            "⚠️ **Yuklab olishda xatolik yuz berdi!**\n\n"
            "Mumkin bo'lgan sabablar:\n"
            "• Profil yopiq (private) bo'lishi mumkin.\n"
            "• Havola noto'g'ri yoki media o'chirilgan.\n"
            "• Video hajmi juda katta (Telegram 50MB gacha ruxsat beradi).",
            parse_mode="Markdown"
        )
    finally:
        for fpath in files_to_clean:
            if fpath and os.path.exists(fpath):
                try:
                    os.remove(fpath)
                except Exception:
                    pass


# AI holatida kelgan xabarlar
@dp.message(BotStates.ai_chat, F.text)
async def handle_ai_message(message: types.Message):
    # Agar foydalanuvchi adashib Instagram havolasi yuborsa
    match = INSTAGRAM_PATTERN.search(message.text)
    if match:
        await process_instagram_url(message, match.group(1))
        return

    # Foydalanuvchiga yozilayotganini ko'rsatish
    await bot.send_chat_action(chat_id=message.chat.id, action=ChatAction.TYPING)

    # Asinxron ravishda AI dan javob olish
    reply = await asyncio.to_thread(ask_ai, message.from_user.id, message.text)

    try:
        await message.reply(reply, parse_mode="Markdown")
    except Exception:
        # Markdown parsingda belgilarda xatolik bo'lsa, oddiy matn tarzida yuboramiz
        await message.reply(reply)


# Barcha boshqa oddiy matnli xabarlar
@dp.message(F.text)
async def handle_general_text(message: types.Message, state: FSMContext):
    # Instagram havolasi bo'lsa
    match = INSTAGRAM_PATTERN.search(message.text)
    if match:
        await process_instagram_url(message, match.group(1))
        return

    # Noma'lum xabar kelganda
    await message.reply(
        "Iltimos, quyidagi menyudan kerakli bo'limni tanlang:\n"
        "• Sun'iy intellekt bilan gaplashish uchun **🤖 AI Chat** tugmasini bosing.\n"
        "• Instagramdan video/rasm yuklash uchun havolani yuboring.",
        reply_markup=get_main_keyboard(),
        parse_mode="Markdown"
    )


async def main():
    print("Bot ishga tushmoqda...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print("Bot to'xtatildi!")
