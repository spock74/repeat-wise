import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt'],
 
  // Used when no locale matches
  defaultLocale: 'pt',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/dashboard': {
      en: '/dashboard',
      pt: '/painel'
    },
    '/generate': {
      en: '/generate',
      pt: '/gerar'
    },
    '/manage-sets': {
      en: '/manage-sets',
      pt: '/gerir-conjuntos'
    },
    '/settings': {
      en: '/settings',
      pt: '/configuracoes'
    }
  }
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en)/:path*']
};