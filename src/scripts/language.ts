export type Locale = 'es' | 'en';

const STORAGE_KEY = 'portfolio-locale';

export function getLocale(): Locale {
  if (typeof window === 'undefined') return 'es';
  return (localStorage.getItem(STORAGE_KEY) as Locale) || 'es';
}

export function setLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale);
  document.body.setAttribute('data-lang', locale);
  document.dispatchEvent(new CustomEvent('locale-change', { detail: { locale } }));
}

export function toggleLocale(): Locale {
  const current = getLocale();
  const next: Locale = current === 'es' ? 'en' : 'es';
  setLocale(next);
  return next;
}

export function initLocale(): void {
  const locale = getLocale();
  document.documentElement.setAttribute('lang', locale);
  document.body.setAttribute('data-lang', locale);
}
