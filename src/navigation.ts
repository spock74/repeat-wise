import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'pt'] as const;
export const localePrefix = 'always'; // Default
 
export const pathnames = {
  '/': {
    en: '/',
    pt: '/'
  },
  '/dashboard': {
    en: '/dashboard',
    pt: '/painel'
  },
  '/study': {
    en: '/study-session',
    pt: '/sessao-de-estudo'
  },
  '/generate': {
    en: '/generate-questions',
    pt: '/gerar-perguntas'
  },
  '/manage': {
    en: '/manage-sets',
    pt: '/gerenciar-conjuntos'
  }
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});