import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from '../navigation';

export default getRequestConfig(async ({requestLocale}) => {
  // Await the locale from the request
  let locale = await requestLocale;

  // Provide a fallback if the locale is not available
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // default locale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});