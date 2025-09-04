import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/main-layout';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export const metadata: Metadata = {
  title: 'RepeatWise',
  description: 'Master anything with adaptive, spaced repetition learning.',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayout>{children}</MainLayout>
      <Toaster />
    </NextIntlClientProvider>
  );
}
