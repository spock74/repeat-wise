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
 
  if (!messages) {
    return null;
  }
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className='font-body antialiased'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
