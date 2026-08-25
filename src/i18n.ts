export type SupportedLang = 'uz' | 'ru' | 'en';

export interface BotTranslations {
    welcome: (name: string) => string;
    chooseTemplate: string;
    generatingPreview: string;
    previewReady: (templateName: string) => string;
    previewError: string;
    generatingPdf: string;
    pdfCaption: (name: string, templateName: string) => string;
    pdfError: string;
    createStart: string;
    askFirstName: string;
    askLastName: string;
    askJobTitle: string;
    askEmail: string;
    askPhone: string;
    askCity: string;
    askSummary: string;
    askSkills: string;
    askExperience: string;
    createFinished: string;
    chooseLanguage: string;
    languageChanged: string;
    tipsTitle: string;
    aboutText: string;
    coverLetterStart: string;
    coverLetterGenerating: string;
    coverLetterReady: string;
    coverLetterError: string;
    btnWebapp: string;
    btnPreview: string;
    btnDownload: string;
    btnTemplates: string;
    btnCreate: string;
    btnLanguage: string;
    btnTips: string;
    btnCoverLetter: string;
}

export const BOT_I18N: Record<SupportedLang, BotTranslations> = {
    uz: {
        welcome: (name) => `
✦ <b>Simple Resume Assistant</b>

Assalomu alaykum, <b>${name}</b>.
Ushbu bot orqali professional rezyume va cover letter yaratishingiz, 14 ta shablondan birini tanlab, to'g'ridan-to'g'ri PDF formatda yuklab olishingiz mumkin.

<b>Asosiy buyruqlar:</b>
▸ /download — PDF formatda yuklab olish
▸ /preview — Rasm ko'rinishida ko'rish
▸ /templates — Shablonlar katalogi
▸ /create — Rezyumeni to'ldirish
▸ /coverletter — Cover Letter yaratish
▸ /language — Tilni sozlash
▸ /tips — ATS va HR bo'yicha qo'llanma
`,
        chooseTemplate: '◈ <b>Kerakli rezyume shablonini tanlang:</b>',
        generatingPreview: '› Rasm preview generatsiya qilinmoqda, iltimos kuting...',
        previewReady: (templateName) => `✓ <b>"${templateName}"</b> shabloni bo'yicha ko'rinish tayyor:`,
        previewError: '✕ Preview generatsiya qilishda xatolik yuz berdi. Server aloqasini tekshiring.',
        generatingPdf: '› PDF hujjati shakllantirilmoqda, iltimos kuting...',
        pdfCaption: (name, templateName) => `<b>${name} — Professional Resume</b>\nShablon: <i>${templateName}</i>\nFormat: <code>PDF (A4)</code>`,
        pdfError: '✕ PDF yaratishda xatolik yuz berdi. Backend server holatini tekshiring.',
        createStart: '✦ <b>Yangi rezyume to\'ldirish boshlandi</b>\n\nIsmingizni kiriting:',
        askFirstName: 'Ismingizni kiriting:',
        askLastName: 'Familiyangizni kiriting:',
        askJobTitle: 'Kasbingiz yoki mutaxassisligingiz (masalan: <i>Frontend Developer</i>):',
        askEmail: 'Email manzilingiz (masalan: <i>name@domain.com</i>):',
        askPhone: 'Telefon raqamingiz (masalan: <i>+998 90 123 45 67</i>):',
        askCity: 'Yashash joyingiz (shahar, mamlakat):',
        askSummary: 'O\'zingiz haqingizda qisqacha ma\'lumot (Professional Summary):',
        askSkills: 'Asosiy ko\'nikmalaringiz (vergul bilan ajrating, masalan: <i>React, TypeScript, CSS, Git</i>):',
        askExperience: 'Asosiy ish tajribangiz (kompaniya, lavozim, erishilgan natijalar):',
        createFinished: '✓ <b>Rezyume ma\'lumotlari muvaffaqiyatli saqlandi.</b>\n\nNatijani ko\'rish uchun quyidagi tugmalardan birini tanlang:',
        chooseLanguage: '◈ <b>Bot tilini tanlang:</b>',
        languageChanged: '✓ Til muvaffaqiyatli o\'zgartirildi: <b>O\'zbekcha</b>',
        tipsTitle: `✦ <b>HR va Karyera Bo'yicha Tavsiyalar:</b>

1. <b>STAR Metodi:</b> Ish tajribangizni faqat vazifalar bilan emas, natijalar bilan yozing (Masalan: <i>"Yuklanish tezligini 30% ga oshirdim"</i>).
2. <b>6 Sekund Qoidasi:</b> Recruiter birinchi qarashda Ism, Lavozim va asosiy ko'nikmalarni aniq ko'rishi kerak.
3. <b>ATS Mosligi:</b> Standart bo'lim nomlaridan foydalaning va to'g'ri PDF formatda yuklang.
4. <b>Moslashtirish:</b> Har bir topshirayotgan vakansiyangiz talablariga moslab ko'nikmalaringiz tartibini moslang.`,
        aboutText: `✦ <b>Simple Resume Loyihasi:</b>
100% Bepul, ochiq kodli va ro'yxatdan o'tishni talab qilmaydigan rezyume yaratuvchi platforma.`,
        coverLetterStart: `✦ <b>Cover Letter (Ilova Xati) Yaratish:</b>

Rezyume ma'lumotlaringiz asosida professional va kompaniyaga moslashtirilgan xat tayyorlanadi.`,
        coverLetterGenerating: '› Cover Letter PDF tayyorlanmoqda...',
        coverLetterReady: '✓ <b>Cover Letter PDF tayyor</b>',
        coverLetterError: '✕ Cover Letter yaratishda xatolik yuz berdi.',
        btnWebapp: '✦ Veb Muharrirni Ochish',
        btnPreview: '▸ Preview (Rasm)',
        btnDownload: '▸ PDF Yuklab olish',
        btnTemplates: '◈ Shablonlar',
        btnCreate: '✎ Rezyume to\'ldirish',
        btnLanguage: '🌐 Tilni sozlash',
        btnTips: 'ℹ Maslahatlar',
        btnCoverLetter: '✉ Cover Letter',
    },
    ru: {
        welcome: (name) => `
✦ <b>Simple Resume Assistant</b>

Здравствуйте, <b>${name}</b>.
С помощью этого бота вы можете создавать профессиональные резюме и сопроводительные письма, выбирать из 14 шаблонов и скачивать готовые PDF-документы.

<b>Основные команды:</b>
▸ <code>/download</code> — Скачать в формате PDF
▸ <code>/preview</code> — Предпросмотр изображения
▸ <code>/templates</code> — Каталог шаблонов
▸ <code>/create</code> — Заполнить резюме
▸ <code>/coverletter</code> — Сопроводительное письмо
▸ <code>/language</code> — Сменить язык
▸ <code>/tips</code> — Советы экспертов и ATS
`,
        chooseTemplate: '◈ <b>Выберите подходящий шаблон резюме:</b>',
        generatingPreview: '› Генерируем изображение предпросмотра, пожалуйста, подождите...',
        previewReady: (templateName) => `✓ Предпросмотр шаблона <b>"${templateName}"</b> готов:`,
        previewError: '✕ Ошибка при создании превью. Проверьте соединение с сервером.',
        generatingPdf: '› Формируем PDF-документ, пожалуйста, подождите...',
        pdfCaption: (name, templateName) => `<b>${name} — Профессиональное резюме</b>\nШаблон: <i>${templateName}</i>\nФормат: <code>PDF (A4)</code>`,
        pdfError: '✕ Ошибка при создании PDF. Проверьте работу сервера.',
        createStart: '✦ <b>Заполнение резюме</b>\n\nВведите ваше имя:',
        askFirstName: 'Введите ваше имя:',
        askLastName: 'Введите вашу фамилию:',
        askJobTitle: 'Ваша профессия / должность (например: <i>Frontend Developer</i>):',
        askEmail: 'Email адрес (например: <i>name@domain.com</i>):',
        askPhone: 'Номер телефона (например: <i>+998 90 123 45 67</i>):',
        askCity: 'Город и страна проживания:',
        askSummary: 'Краткое описание профессионального опыта (Summary):',
        askSkills: 'Ключевые навыки через запятую (например: <i>React, TypeScript, CSS, Git</i>):',
        askExperience: 'Основной опыт работы (компания, должность, достижения):',
        createFinished: '✓ <b>Данные резюме успешно сохранены.</b>\n\nВыберите действие для продолжения:',
        chooseLanguage: '◈ <b>Выберите язык интерфейса:</b>',
        languageChanged: '✓ Язык успешно изменен на: <b>Русский</b>',
        tipsTitle: `✦ <b>Советы экспертов и требования ATS:</b>

1. <b>Метод STAR:</b> Описывайте опыт через конкретные результаты и метрики (например: <i>"Оптимизировал скорость загрузки на 30%"</i>).
2. <b>Правило 6 секунд:</b> Рекрутер за первые 6 секунд должен увидеть Имя, Должность и ключевые навыки.
3. <b>Совместимость с ATS:</b> Используйте понятную структуру и скачивайте стандартный PDF.
4. <b>Персонализация:</b> Адаптируйте ключевые слова под конкретные вакансии.`,
        aboutText: `✦ <b>О проекте Simple Resume:</b>
100% бесплатный сервис для создания профессиональных резюме без регистрации и скрытых платежей.`,
        coverLetterStart: `✦ <b>Создание сопроводительного письма:</b>

Мы подготовим персонализированное письмо на основе данных вашего резюме.`,
        coverLetterGenerating: '› Генерируем PDF сопроводительного письма...',
        coverLetterReady: '✓ <b>PDF сопроводительного письма готов</b>',
        coverLetterError: '✕ Ошибка при создании сопроводительного письма.',
        btnWebapp: '✦ Открыть веб-редактор',
        btnPreview: '▸ Предпросмотр (Изображение)',
        btnDownload: '▸ Скачать PDF',
        btnTemplates: '◈ Шаблоны',
        btnCreate: '✎ Заполнить резюме',
        btnLanguage: '🌐 Язык',
        btnTips: 'ℹ Советы HR',
        btnCoverLetter: '✉ Cover Letter',
    },
    en: {
        welcome: (name) => `
✦ <b>Simple Resume Assistant</b>

Hello, <b>${name}</b>.
Build ATS-compliant resumes and cover letters for free, choose from 14 handcrafted templates, and export print-ready PDFs.

<b>Available Commands:</b>
▸ <code>/download</code> — Download PDF resume
▸ <code>/preview</code> — Generate image preview
▸ <code>/templates</code> — Browse all templates
▸ <code>/create</code> — Build resume step by step
▸ <code>/coverletter</code> — Generate cover letter
▸ <code>/language</code> — Change interface language
▸ <code>/tips</code> — HR & ATS career guide
`,
        chooseTemplate: '◈ <b>Select a template to apply:</b>',
        generatingPreview: '› Rendering high-resolution preview image, please wait...',
        previewReady: (templateName) => `✓ Preview for <b>"${templateName}"</b> is ready:`,
        previewError: '✕ Error rendering preview. Please ensure backend server is reachable.',
        generatingPdf: '› Generating your PDF document, please wait...',
        pdfCaption: (name, templateName) => `<b>${name} — Professional Resume</b>\nTemplate: <i>${templateName}</i>\nFormat: <code>PDF (A4)</code>`,
        pdfError: '✕ Failed to generate PDF document. Check backend service status.',
        createStart: '✦ <b>Build your resume step by step</b>\n\nPlease enter your first name:',
        askFirstName: 'Please enter your first name:',
        askLastName: 'Enter your last name:',
        askJobTitle: 'Enter your target job title (e.g. <i>Frontend Developer</i>):',
        askEmail: 'Enter your email address (e.g. <i>name@domain.com</i>):',
        askPhone: 'Enter your phone number (e.g. <i>+998 90 123 45 67</i>):',
        askCity: 'Enter your City and Country:',
        askSummary: 'Write a brief professional summary about yourself:',
        askSkills: 'Enter your core skills separated by commas (e.g. <i>React, TypeScript, CSS, Git</i>):',
        askExperience: 'Describe your primary work experience (Company, Role, Key Achievements):',
        createFinished: '✓ <b>Your resume details have been saved.</b>\n\nSelect an action below to view or export:',
        chooseLanguage: '◈ <b>Please select your preferred language:</b>',
        languageChanged: '✓ Language successfully updated to: <b>English</b>',
        tipsTitle: `✦ <b>Recruiter & Career Advice:</b>

1. <b>The STAR Method:</b> Focus on quantifiable accomplishments rather than just tasks (e.g., <i>"Decreased server latency by 35%"</i>).
2. <b>The 6-Second Rule:</b> Recruiters scan quickly — ensure Name, Role, and Top Skills are immediately prominent.
3. <b>ATS Friendly:</b> Use standard sections and clean formatting (our PDFs are 100% ATS compliant).
4. <b>Tailor Your Application:</b> Match top keywords from the job description in your skills section.`,
        aboutText: `✦ <b>About Simple Resume:</b>
100% Free, open-source resume & cover letter builder with no registration or paywalls.`,
        coverLetterStart: `✦ <b>Generate Cover Letter:</b>

Draft a personalized cover letter matching your profile.`,
        coverLetterGenerating: '› Generating Cover Letter PDF...',
        coverLetterReady: '✓ <b>Cover Letter PDF is ready</b>',
        coverLetterError: '✕ Error generating cover letter PDF.',
        btnWebapp: '✦ Open Web Builder',
        btnPreview: '▸ Image Preview',
        btnDownload: '▸ Download PDF',
        btnTemplates: '◈ Templates',
        btnCreate: '✎ Build Resume',
        btnLanguage: '🌐 Language',
        btnTips: 'ℹ HR Tips',
        btnCoverLetter: '✉ Cover Letter',
    },
};
