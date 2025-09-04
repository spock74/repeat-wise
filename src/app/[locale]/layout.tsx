import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/main-layout';

export const metadata: Metadata = {
  title: 'RepeatWise',
  description: 'Master anything with adaptive, spaced repetition learning.',
};

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <Toaster />
    </>
  );
}
