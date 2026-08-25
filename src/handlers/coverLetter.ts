import { InputFile, InlineKeyboard, type Context } from 'grammy';
import { BOT_I18N } from '../i18n.js';
import { getSession } from '../session.js';
import { API_URL, WEBAPP_URL } from '../config.js';
import { addWebLinkButton } from './start.js';

export async function handleCoverLetter(ctx: Context) {
  if (!ctx.from) return;
  const session = getSession(ctx.from.id);
  const t = BOT_I18N[session.language];

  const statusMsg = await ctx.reply(t.coverLetterGenerating);

  try {
    const fullName = `${session.data.firstName} ${session.data.lastName}`;
    const coverLetterData = {
      senderName: fullName,
      senderTitle: session.data.jobTitle,
      senderEmail: session.data.email,
      senderPhone: session.data.phone,
      senderAddress: session.data.city,
      date: new Date().toLocaleDateString(session.language === 'uz' ? 'uz-UZ' : session.language === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      recipientName: 'Hiring Manager',
      recipientTitle: 'Head of Department',
      companyName: 'Target Company Inc.',
      companyAddress: 'San Francisco, CA',
      salutation: session.language === 'uz' ? 'Hurmatli Ish Beruvchi,' : session.language === 'ru' ? 'Уважаемый работодатель,' : 'Dear Hiring Manager,',
      openingParagraph: session.language === 'uz'
        ? `Men ${session.data.jobTitle} lavozimiga bo'lgan katta qiziqishimni bildirish uchun ushbu xatni yozyapman. Mening sohadagi tajribam va jamoaviy yondashuvim kompaniyangiz rivojiga ijobiy hissa qo'shishiga ishonchim komil.`
        : session.language === 'ru'
        ? `Я обращаюсь к вам с большим интересом к позиции ${session.data.jobTitle}. Мой профессиональный опыт и ориентация на результат помогут вашей команде достичь новых высот.`
        : `I am writing to express my strong interest in the ${session.data.jobTitle} position. With my relevant background and technical expertise, I am confident in delivering tangible value to your organization.`,
      bodyParagraphs: [
        session.data.summary || (session.language === 'uz' ? 'Faoliyatim davomida murakkab loyihalarni muvaffaqiyatli yakunlash va yuqori sifatli mahsulotlar yaratishga e\'tibor qaratdim.' : 'Throughout my career, I have focused on solving complex challenges and optimizing workflows.'),
        session.data.experience || (session.language === 'uz' ? 'Zamonaviy texnologiyalar va ilg\'or amaliyotlarni qo\'llash orqali jamoada yuqori natijalarga erishganman.' : 'My technical foundations and drive for continuous improvement enable me to integrate smoothly into high-performing teams.'),
      ],
      closingParagraph: session.language === 'uz'
        ? 'O\'z tajribam bilan kompaniyangizga qanday foyda keltira olishimni suhbat davomida batafsil muhokama qilishdan mamnun bo\'lardim.'
        : session.language === 'ru'
        ? 'Буду рад обсудить возможности сотрудничества на собеседовании.'
        : 'I welcome the opportunity to discuss how my skill set can bring tangible value to your organization.',
      closing: session.language === 'uz' ? 'Hurmat bilan,' : session.language === 'ru' ? 'С уважением,' : 'Sincerely,',
      signatureName: fullName,
    };

    const coverLetterConfig = {
      templateId: 'cl-classic',
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#111827', text: '#1e293b', background: '#ffffff', accent: '#111827', headerBg: '#ffffff', headerText: '#111827' },
      spacing: { lineHeight: 1.65, pageMargin: 36, paragraphGap: 14 },
      headerStyle: 'classic',
      pageFormat: 'A4',
    };

    const pdfRes = await fetch(`${API_URL}/api/cover-letter/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coverLetterData,
        coverLetterConfig,
      }),
    });

    if (!pdfRes.ok) throw new Error('Cover letter PDF generation failed');

    const arrayBuffer = await pdfRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${session.data.firstName}_${session.data.lastName}_Cover_Letter.pdf`.replace(/\s+/g, '_');

    const keyboard = new InlineKeyboard();
    addWebLinkButton(keyboard, t.btnWebapp, WEBAPP_URL.replace('/builder', '/cover-letter'));
    keyboard.row().text(t.btnDownload, 'action_download').text(t.btnPreview, 'action_preview');

    await ctx.replyWithDocument(new InputFile(buffer, fileName), {
      caption: `<b>${fullName} — Cover Letter</b>\nFormat: <code>PDF (A4)</code>`,
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });

    try {
      await ctx.api.deleteMessage(ctx.chat!.id, statusMsg.message_id);
    } catch (_) {}
  } catch (err) {
    console.error('Cover letter error:', err);
    await ctx.api.editMessageText(ctx.chat!.id, statusMsg.message_id, t.coverLetterError);
  }
}
