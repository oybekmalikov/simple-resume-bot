import { InputFile, InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession, buildResumePayload } from '../session.js';
import { API_URL } from '../config.js';

export async function handlePreview(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  const statusMsg = await ctx.reply(t.generatingPreview);

  try {
    const tmplRes = await fetch(`${API_URL}/api/templates/${session.templateId}`);
    const tmplData = await tmplRes.json();
    const resumeData = buildResumePayload(session);

    const previewRes = await fetch(`${API_URL}/api/pdf/preview-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeData,
        templateConfig: tmplData.config,
      }),
    });

    if (!previewRes.ok) throw new Error('Preview generation failed');

    const arrayBuffer = await previewRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const keyboard = new InlineKeyboard()
      .text(t.btnDownload, 'action_download')
      .text(t.btnTemplates, 'action_templates');

    await ctx.replyWithPhoto(new InputFile(buffer, 'resume_preview.png'), {
      caption: t.previewReady(tmplData.name),
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });

    try {
      await ctx.api.deleteMessage(ctx.chat!.id, statusMsg.message_id);
    } catch (_) {}
  } catch (err) {
    console.error('Preview error:', err);
    await ctx.api.editMessageText(ctx.chat!.id, statusMsg.message_id, t.previewError);
  }
}
