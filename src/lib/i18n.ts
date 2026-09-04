export type Locale = 'en' | 'hi';

export const translations = {
  en: {
    home: 'Home',
    profile: 'Profile',
    login: 'Log in',
    logout: 'Log out',
    tagline: 'One school. Every exam. Your language.',
    chooseExams: 'Choose your exams',
    upcomingDeadlines: 'Upcoming deadlines',
    currentStreak: 'Current streak',
    completeQuiz: "Complete today's quiz",
    quizDone: "Today's quiz done",
    badges: 'Badges',
  },
  hi: {
    home: 'होम',
    profile: 'प्रोफ़ाइल',
    login: 'लॉग इन करें',
    logout: 'लॉग आउट',
    tagline: 'एक स्कूल। हर परीक्षा। आपकी भाषा।',
    chooseExams: 'अपनी परीक्षाएं चुनें',
    upcomingDeadlines: 'आगामी समय सीमाएं',
    currentStreak: 'वर्तमान स्ट्रीक',
    completeQuiz: 'आज का क्विज़ पूरा करें',
    quizDone: 'आज का क्विज़ पूरा हुआ',
    badges: 'बैज',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
