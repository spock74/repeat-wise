import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleRootPage() {
  const locale = useLocale();
  redirect(`/${locale}/dashboard`);
}
