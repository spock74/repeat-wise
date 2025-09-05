import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'pt'
});
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
