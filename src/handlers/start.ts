import { InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession } from '../session.js';
import { WEBAPP_URL } from '../config.js';

export function addWebLinkButton(keyboard: InlineKeyboard, label: string, url: string): InlineKeyboard {
  if (!url) return keyboard;
  const isLocal = url.includes('localhost') || url.includes('127.0.0.1');

  if (url.startsWith('https://') && !isLocal) {
    return keyboard.webApp(label, url);
  }
  if (url.startsWith('http://') && !isLocal) {
    return keyboard.url(label, url);
  }
  return keyboard.text(label, 'local_web_info');
}

export async function handleStart(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];
  const name = ctx.from.first_name || 'Foydalanuvchi';

  const keyboard = new InlineKeyboard();
  addWebLinkButton(keyboard, t.btnWebapp, WEBAPP_URL);
  keyboard
    .row()
    .text(t.btnPreview, 'action_preview')
    .text(t.btnDownload, 'action_download')
    .row()
    .text(t.btnTemplates, 'action_templates')
    .text(t.btnCreate, 'action_create')
    .row()
    .text(t.btnCoverLetter, 'action_coverletter')
    .text(t.btnLanguage, 'action_language')
    .row()
    .text(t.btnTips, 'action_tips');

  await ctx.reply(t.welcome(name), {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  });
}

export async function handleLanguageCommand(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  const keyboard = new InlineKeyboard()
    .text('🇺🇿 O\'zbekcha', 'lang_uz')
    .text('🇷🇺 Русский', 'lang_ru')
    .text('🇬🇧 English', 'lang_en');

  await ctx.reply(t.chooseLanguage, {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  });
}

export async function handleTips(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  await ctx.reply(t.tipsTitle, { parse_mode: 'HTML' });
}

export async function handleAbout(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  await ctx.reply(t.aboutText, { parse_mode: 'HTML' });
}
