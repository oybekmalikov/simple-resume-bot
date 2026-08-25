import { InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession } from '../session.js';

export async function handleCreateStart(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  session.step = 'first_name';
  await ctx.reply(t.createStart, { parse_mode: 'HTML' });
}

export async function handleCreateMessage(ctx: Context) {
  if (!ctx.from || !ctx.message?.text) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];
  const text = ctx.message.text.trim();

  switch (session.step) {
    case 'first_name':
      session.data.firstName = text;
      session.step = 'last_name';
      await ctx.reply(t.askLastName, { parse_mode: 'HTML' });
      break;

    case 'last_name':
      session.data.lastName = text;
      session.step = 'job_title';
      await ctx.reply(t.askJobTitle, { parse_mode: 'HTML' });
      break;

    case 'job_title':
      session.data.jobTitle = text;
      session.step = 'email';
      await ctx.reply(t.askEmail, { parse_mode: 'HTML' });
      break;

    case 'email':
      session.data.email = text;
      session.step = 'phone';
      await ctx.reply(t.askPhone, { parse_mode: 'HTML' });
      break;

    case 'phone':
      session.data.phone = text;
      session.step = 'city';
      await ctx.reply(t.askCity, { parse_mode: 'HTML' });
      break;

    case 'city':
      session.data.city = text;
      session.step = 'summary';
      await ctx.reply(t.askSummary, { parse_mode: 'HTML' });
      break;

    case 'summary':
      session.data.summary = text;
      session.step = 'skills';
      await ctx.reply(t.askSkills, { parse_mode: 'HTML' });
      break;

    case 'skills':
      session.data.skills = text
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
      session.step = 'experience';
      await ctx.reply(t.askExperience, { parse_mode: 'HTML' });
      break;

    case 'experience':
      session.data.experience = text;
      session.step = undefined;

      const keyboard = new InlineKeyboard()
        .text(t.btnPreview, 'action_preview')
        .text(t.btnDownload, 'action_download')
        .row()
        .text(t.btnTemplates, 'action_templates');

      await ctx.reply(t.createFinished, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      });
      break;

    default:
      break;
  }
}
