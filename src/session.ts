import type { SupportedLang } from './i18n.js';

export interface BotUserData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  summary: string;
  skills: string[];
  experience: string;
}

export interface UserSession {
  language: SupportedLang;
  templateId: string;
  step?: string;
  data: BotUserData;
}

const userSessions = new Map<number, UserSession>();

export function getSession(userId: number): UserSession {
  if (!userSessions.has(userId)) {
    userSessions.set(userId, {
      language: 'uz',
      templateId: 'classic',
      data: {
        firstName: 'Dilshod',
        lastName: 'Karimov',
        jobTitle: 'Full-Stack Developer',
        email: 'dilshod.dev@mail.com',
        phone: '+998 90 123 45 67',
        city: 'Toshkent, O\'zbekiston',
        summary: 'Tizimlarni loyihalash va yuqori yuklamali veb-ilovalarni ishlab chiqish bo\'yicha 4 yillik tajribaga ega dasturchi.',
        skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
        experience: 'FinTech kompaniyasida Senior Developer bo\'lib ishlagan, to\'lov tizimlari integratsiyasini amalga oshirgan.',
      },
    });
  }
  return userSessions.get(userId)!;
}

export function setSessionLanguage(userId: number, lang: SupportedLang): void {
  const session = getSession(userId);
  session.language = lang;
}

export function setSessionTemplate(userId: number, templateId: string): void {
  const session = getSession(userId);
  session.templateId = templateId;
}

export function buildResumePayload(session: UserSession) {
  return {
    personalInfo: {
      firstName: session.data.firstName,
      lastName: session.data.lastName,
      jobTitle: session.data.jobTitle,
      email: session.data.email,
      phone: session.data.phone,
      address: '',
      city: session.data.city,
      country: '',
      website: '',
      linkedin: 'linkedin.com/in/' + session.data.firstName.toLowerCase(),
      github: 'github.com/' + session.data.firstName.toLowerCase(),
    },
    summary: {
      content: session.data.summary,
    },
    workExperience: [
      {
        id: 'exp-1',
        company: 'Global Technologies Inc.',
        position: session.data.jobTitle,
        startDate: '2021-06',
        endDate: '',
        current: true,
        city: session.data.city,
        description: session.data.experience,
        highlights: [
          'Jamoa bilan birgalikda yuqori samaradorlikka ega funksional modullarni ishlab chiqdi.',
          'Kod sifatini yaxshilash va tizim tezligini oshirish bo\'yicha tashabbuslarni amalga oshirdi.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'Toshkent Axborot Texnologiyalari Universiteti',
        degree: 'Bakalavr',
        field: 'Kompyuter Injiniringi',
        startDate: '2017-09',
        endDate: '2021-06',
        current: false,
        city: 'Toshkent',
        description: '',
        gpa: '3.8',
      },
    ],
    skills: session.data.skills.map((name, i) => ({
      id: `sk-${i}`,
      name,
      level: 'Advanced',
      category: 'Technical',
    })),
    languages: [
      { id: 'lang-1', name: 'O\'zbek tili', level: 'Ona tili' },
      { id: 'lang-2', name: 'Ingliz tili', level: 'Professional (B2/C1)' },
    ],
    certificates: [],
    interests: [{ id: 'int-1', name: 'Texnologiyalar' }, { id: 'int-2', name: 'Open Source' }],
  };
}
