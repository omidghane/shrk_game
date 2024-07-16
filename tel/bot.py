from telebot import TeleBot
from telebot.types import (Message, InlineKeyboardMarkup,
                           InlineKeyboardButton, WebAppInfo)


bot = TeleBot('7427969256:AAHgO8U58YqU7UzqIsi7sawPahaaNDOmHC8')


@bot.message_handler(commands=['start'])
def start(message: Message):
    markup = InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Your MiniApp',
                              web_app=WebAppInfo(
                                  'https://b4cf-212-80-12-102.ngrok-free.app/'
                              ))]
    ])

    bot.send_message(chat_id=message.chat.id, text='بفرمایید وب اپ شما:', reply_markup=markup)


if __name__ == '__main__':
    bot.polling(skip_pending=True)
