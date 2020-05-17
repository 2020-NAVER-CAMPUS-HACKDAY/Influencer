const DEFAULT_LOCALE = 'ko-KR';
const AVAILABLE_LOCALES = ['en-US', 'ko-KR'];
const FALLBACK_LOCALES_PER_LANGUAGE: Record<string, string> = {
  en: 'en-US',
  ko: 'ko-KR',
};

function sanitizeLocale(value?: string): string {
  if (value) {
    if (AVAILABLE_LOCALES.includes(value)) {
      return value;
    }

    const language = value.split('-')[0];
    const locale = FALLBACK_LOCALES_PER_LANGUAGE[language];

    if (locale && AVAILABLE_LOCALES.includes(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

function getLocale(query): string {
  return sanitizeLocale(query.hl);
}

export default getLocale;
