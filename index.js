require('dotenv').config();
const { chromium } = require('playwright');
const { Telegraf } = require('telegraf');

    
    
    const bot = new Telegraf(process.env.BOT_TOKEN);
    
    //url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`
    var acao = '';
    
    bot.start( (ctx) => {
        return ctx.telegram.sendMessage(ctx.message.chat.id, `WHAAAZAAAAAAP ${ctx.message.chat.first_name}`);
    });
    
    
    async function action(acao){
        const browser = await chromium.launch();
        const page = await browser.newPage();
        var url = `https://www.google.com/search?q=${acao}+cota%C3%A7%C3%A3o&oq=VSLH&aqs=chrome.0.69i59j69i57j0i131i433i512l2j0i67j0i512l3j0i131i433i512j0i512.4276j1j7&sourceid=chrome&ie=UTF-8`;
        await page.goto(url);
        const photo = await page.screenshot({path:'exemple.png'});
        if(photo){
            return await browser.close();
        }
        
    }
    
    bot.on('text', async (ctx) => {
        
        await action(ctx.message.text);
        
        await ctx.replyWithPhoto({ source: 'exemple.png' });
        
    })
    
    bot.launch();
    
/*
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
*/