import dotenv from 'dotenv';

dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN || '';
export const API_URL = process.env.API_URL || 'http://localhost:3001';
export const WEBAPP_URL = process.env.WEBAPP_URL || 'https://simple-resume-frontend.vercel.app/builder';

if (!BOT_TOKEN || BOT_TOKEN.includes('SAMPLE_TOKEN')) {
  console.log('⚠️ [Telegram Bot] No real BOT_TOKEN provided in bot/.env.');
}
