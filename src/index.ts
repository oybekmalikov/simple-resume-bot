import http from 'http';
import { Bot } from 'grammy';
import { BOT_TOKEN } from './config.js';
import { handleStart, handleLanguageCommand, handleTips, handleAbout } from './handlers/start.js';
import { handleTemplates } from './handlers/templates.js';
import { handlePreview } from './handlers/preview.js';
import { handleDownload } from './handlers/download.js';
import { handleCreateStart, handleCreateMessage } from './handlers/create.js';
import { handleCoverLetter } from './handlers/coverLetter.js';
import { handleCallbackQuery } from './handlers/callbacks.js';
import { getSession } from './session.js';

export const bot = new Bot(BOT_TOKEN || 'dummy_token');

bot.catch((err) => {
  console.error(`⚠️ [Bot Error] on update ${err.ctx.update.update_id}:`, err.error);
});

bot.command('start', handleStart);
bot.command('templates', handleTemplates);
bot.command('preview', handlePreview);
bot.command('download', handleDownload);
bot.command('create', handleCreateStart);
bot.command('coverletter', handleCoverLetter);
bot.command('language', handleLanguageCommand);
bot.command('tips', handleTips);
bot.command('about', handleAbout);

bot.on('callback_query:data', handleCallbackQuery);

bot.on('message:text', async (ctx) => {
  const session = getSession(ctx.from.id);
  if (session.step) {
    await handleCreateMessage(ctx);
  } else {
    await handleStart(ctx);
  }
});

const PORT = process.env.PORT || 3000;
const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', service: 'simple-resume-bot', uptime: process.uptime() }));
});

server.listen(PORT, () => {
  console.log(`Bot health-check server running on port ${PORT}`);
});

if (BOT_TOKEN && !BOT_TOKEN.includes('SAMPLE_TOKEN') && !BOT_TOKEN.includes('your_telegram_bot_token')) {
  console.log('Starting Simple Resume Telegram Bot...');
  bot.start({
    onStart: (botInfo) => {
      console.log(`Simple Resume Bot @${botInfo.username} is running successfully!`);
    },
  });
} else {
  console.log('Telegram Bot initialized. Set a valid BOT_TOKEN in bot/.env to start polling.');
}
