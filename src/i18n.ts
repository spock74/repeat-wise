import {getLocalePrefix, getPathnames} from 'next-intl/navigation';

export const locales = ['en', 'pt'];
export const localePrefix = 'always';

export const pathnames = getPathnames({locales});
