import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import MainLayout from '@/components/main-layout';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';
import type {Metadata} from 'next';
import {Inter as FontSans} from 'next/font/google';
import '../globals.css';

const fontSans = FontSans({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
  title: 'Next-Gen Flashcards',
  description: 'A modern flashcard app built with Next.js and AI.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
