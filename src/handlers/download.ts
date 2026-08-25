import { InputFile, InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession, buildResumePayload } from '../session.js';
import { API_URL, WEBAPP_URL } from '../config.js';
import { addWebLinkButton } from './start.js';

export async function handleDownload(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  const statusMsg = await ctx.reply(t.generatingPdf);

  try {
    const tmplRes = await fetch(`${API_URL}/api/templates/${session.templateId}`);
    const tmplData = await tmplRes.json();
    const resumeData = buildResumePayload(session);

    const pdfRes = await fetch(`${API_URL}/api/pdf/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeData,
        templateConfig: tmplData.config,
      }),
    });

    if (!pdfRes.ok) throw new Error('PDF generation failed');

    const arrayBuffer = await pdfRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${session.data.firstName}_${session.data.lastName}_Resume.pdf`.replace(/\s+/g, '_');

    const keyboard = new InlineKeyboard();
    addWebLinkButton(keyboard, t.btnWebapp, WEBAPP_URL);
    keyboard
      .row()
      .text(t.btnPreview, 'action_preview')
      .text(t.btnTemplates, 'action_templates');

    const fullName = `${session.data.firstName} ${session.data.lastName}`;
    await ctx.replyWithDocument(new InputFile(buffer, fileName), {
      caption: t.pdfCaption(fullName, tmplData.name),
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });

    try {
      await ctx.api.deleteMessage(ctx.chat!.id, statusMsg.message_id);
    } catch (_) {}
  } catch (err) {
    console.error('PDF error:', err);
    await ctx.api.editMessageText(ctx.chat!.id, statusMsg.message_id, t.pdfError);
  }
}
