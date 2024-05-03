const TelegramApi = require('node-telegram-bot-api');
const token = '6993337733:AAFu1KhRUI2yqwhby22-TrqBMyF53Fq3Iiw';
const bot = new TelegramApi(token, {polling: true});
const chats = {}
const {gameOptions, againOptions} = require('./options');

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Numbe guessing game'},
]);

const start = () =>
    {
        bot.on('message', msg => {
            const text = msg.text;
            const id = msg.chat.id;
            console.log(msg);
            if(text === '/start')
                return bot.sendMessage(id, `Welcome to Megaton!`);
            else if (text === '/info')
                return bot.sendMessage(id, `your name is ${msg.from.first_name} ${msg.from.last_name}`);
            else if (text === '/game')
                {
                    bot.sendMessage(id, `Welcome to the game!`); 
                    return startGame(id);
                }

            return bot.sendMessage(id, `Sorry, I dont understand you!`);
    });

const startGame = async (userId) =>
    {
        const randNum = Math.floor(Math.random() * 10);
        chats[userId] = randNum;
        await bot.sendMessage(userId, `I will pick a number from 0 to 10 ` 
        + `and you will have to guess it! Pss...It's ${chats[userId]}`, gameOptions);
    }








        bot.on('callback_query', async msg => {
            console.log(msg);
            const text = msg.text;
            const id = msg.message.chat.id;
            if (msg.data === 'again')
                return startGame(id);
            if (msg.data.toString() === chats[id].toString())
                return  bot.sendMessage(id, `You are right! It's ${msg.data}!`, againOptions);
            else
                return  bot.sendMessage(id, `You are wrong! It's not ${msg.data}! Its ${chats[id]}`, againOptions);
        });
    }

start();
/* bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome ${msg.chat.first_name}`);
  }); */