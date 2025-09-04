import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
const intlMiddleware = createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'pt'
});

export default function middleware(req: NextRequest): NextResponse {
  // If the request is for the root, let the intlMiddleware handle it.
  // which will redirect to the default locale.
  if (req.nextUrl.pathname === '/') {
    return intlMiddleware(req);
  }

  // For any other path, if there's no locale, redirect to the default locale.
  const [, locale] = req.nextUrl.pathname.split('/');
  if (!['pt', 'en'].includes(locale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/pt${req.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
