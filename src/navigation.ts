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
    pt: '/dashboard'
  },
  '/study': {
    en: '/study',
    pt: '/study'
  },
  '/generate': {
    en: '/generate',
    pt: '/generate'
  },
  '/manage': {
    en: '/manage',
    pt: '/manage'
  }
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});