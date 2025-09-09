import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'pt'] as const;
export const localePrefix = 'always'; // Default
 
export const pathnames = {
  '/dashboard': {
    en: '/dashboard',
    pt: '/painel'
  }
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});