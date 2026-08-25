import { InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession } from '../session.js';
import { API_URL } from '../config.js';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

export async function handleTemplates(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  try {
    const res = await fetch(`${API_URL}/api/templates`);
    const templates: TemplateItem[] = await res.json();

    const keyboard = new InlineKeyboard();
    templates.forEach((tmpl, index) => {
      const isSelected = session.templateId === tmpl.id;
      const label = `${isSelected ? '✓ ' : '▫ '}${tmpl.name}`;
      keyboard.text(label, `set_template_${tmpl.id}`);
      if (index % 2 === 1) keyboard.row();
    });

    keyboard.row().text(t.btnPreview, 'action_preview').text(t.btnDownload, 'action_download');

    await ctx.reply(t.chooseTemplate, {
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });
  } catch (err) {
    console.error('Error fetching templates:', err);
    await ctx.reply(t.previewError);
  }
}
