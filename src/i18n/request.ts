import {getRequestConfig} from 'next-intl/server';
import {locales} from '../navigation';

export default getRequestConfig(async (params) => {
  const locale = (params && params.locale) || 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});