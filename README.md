# 🤖 Simple Resume — Telegram Bot

<p align="left">
  <a href="https://t.me/simpleresumebot" target="_blank">
    <img src="https://img.shields.io/badge/🤖_Telegram_Bot-@simpleresumebot-229ED9?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram Bot" />
  </a>
  <a href="https://simple-resume-frontend.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Web_App-Visit_Website-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Web App" />
  </a>
</p>

### 🔗 Live Bot & Web App:
- 🤖 **Telegram Bot:** [@simpleresumebot](https://t.me/simpleresumebot) (`https://t.me/simpleresumebot`)
- 🌐 **Web Site:** [https://simple-resume-frontend.vercel.app](https://simple-resume-frontend.vercel.app)

---

Official Telegram Bot for Simple Resume built with **grammY framework** and **TypeScript**.

---

## 🌟 Capabilities

- 📄 **Direct PDF Generation**: Download resume PDFs directly in Telegram chat.
- 🖼 **Image Previews**: View crisp screenshot previews before exporting.
- ✍️ **Interactive Step-by-Step Wizard**: Create a resume by answering prompts.
- ✉️ **Cover Letter Generation**: Create and download cover letters on mobile.
- 🌐 **3 Language Support**: Uzbek (🇺🇿), Russian (🇷🇺), English (🇬🇧) with instant `/language` switcher.
- 🔗 **Web App Link**: Direct bridge into the full web editor.

---

## 🤖 Commands

| Command | Description |
|---|---|
| `/start` | Open main menu with quick interactive buttons |
| `/templates` | View and select from 14 resume templates |
| `/preview` | Generate and receive a high-res image preview |
| `/download` | Generate and download your customized PDF resume |
| `/create` | Launch interactive resume creation wizard |
| `/coverletter` | Generate and download a tailored cover letter |
| `/language` | Switch bot interface language (UZ / RU / EN) |
| `/tips` | Recruiter and ATS preparation advice |
| `/about` | Project info and open-source links |

---

## 🚀 Setup & Launch

```bash
# 1. Install dependencies
npm install

# 2. Configure .env
cp .env.example .env
# Set BOT_TOKEN=your_bot_token_from_botfather
# Set API_URL=http://localhost:3001
# Set WEBAPP_URL=http://localhost:5173/builder

# 3. Start development
npm run dev

# 4. Build TypeScript
npm run build
```

---

## 🐳 Deployment (Render / VPS)

Deploy as a Docker Background Worker using `bot/Dockerfile`.
Set the required environment variable: `BOT_TOKEN`, `API_URL`, and `WEBAPP_URL`.
