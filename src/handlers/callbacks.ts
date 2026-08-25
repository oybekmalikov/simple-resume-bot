import { InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N, type SupportedLang } from '../i18n.js';
import { getSession, setSessionLanguage, setSessionTemplate } from '../session.js';
import { handlePreview } from './preview.js';
import { handleDownload } from './download.js';
import { handleTemplates } from './templates.js';
import { handleCreateStart } from './create.js';
import { handleCoverLetter } from './coverLetter.js';
import { handleLanguageCommand, handleTips, handleStart } from './start.js';

export async function handleCallbackQuery(ctx: Context) {
  if (!ctx.callbackQuery || !ctx.from) return;
  const data = ctx.callbackQuery.data || '';
  const userId = ctx.from.id;
  const session = getSession(userId);

  await ctx.answerCallbackQuery();

  if (data === 'action_preview') {
    await handlePreview(ctx);
    return;
  }

  if (data === 'action_download') {
    await handleDownload(ctx);
    return;
  }

  if (data === 'action_templates') {
    await handleTemplates(ctx);
    return;
  }

  if (data === 'action_create') {
    await handleCreateStart(ctx);
    return;
  }

  if (data === 'action_coverletter') {
    await handleCoverLetter(ctx);
    return;
  }

  if (data === 'action_language') {
    await handleLanguageCommand(ctx);
    return;
  }

  if (data === 'action_tips') {
    await handleTips(ctx);
    return;
  }

  if (data === 'local_web_info') {
    await ctx.reply(
      'ℹ️ Web Muharrir hozircha lokal serverda (localhost). Jonli versiyada Telegram WebApp to\'g\'ridan-to\'g\'ri ochiladi.'
    );
    return;
  }

  if (data.startsWith('lang_')) {
    const lang = data.replace('lang_', '') as SupportedLang;
    setSessionLanguage(userId, lang);
    const t = BOT_I18N[lang];
    await ctx.reply(t.languageChanged, { parse_mode: 'HTML' });
    await handleStart(ctx);
    return;
  }

  if (data.startsWith('set_template_')) {
    const templateId = data.replace('set_template_', '');
    setSessionTemplate(userId, templateId);
    const t = BOT_I18N[session.language];

    const keyboard = new InlineKeyboard()
      .text(t.btnPreview, 'action_preview')
      .text(t.btnDownload, 'action_download')
      .row()
      .text(t.btnTemplates, 'action_templates');

    await ctx.reply(
      `✓ <b>"${templateId}"</b> shabloni tanlandi.\n\nKo'rinishni tekshirish uchun <b>Preview</b> tugmasini bosing:`,
      {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      }
    );
    return;
  }
}
