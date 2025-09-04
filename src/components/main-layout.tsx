'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations, useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1" />
          <LocaleSwitcher />
          <UserMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    // This will replace the current locale in the pathname with the new one.
    const newPath = pathname.replace(`/${locale}`, `/${value}`);
    window.location.href = newPath;
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">PT</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}


function SidebarNav() {
  const pathname = usePathname();
  const t = useTranslations('Layout');
  const locale = useLocale();
  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/study', label: t('studySession'), icon: BookOpen },
    { href: '/generate', label: t('generateQuestions'), icon: Sparkles },
    { href: '/manage', label: t('manageSets'), icon: Settings },
  ];
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => {
        const fullPath = `/${locale}${href}`;
        const isActive = pathname.startsWith(fullPath);
        
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-muted text-primary': isActive }
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )
      })}
    </nav>
  );
}

function Sidebar() {
  const t = useTranslations('Layout');
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="">{t('appName')}</span>
          </Link>
        </div>
        <div className="flex-1">
          <SidebarNav />
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  const t = useTranslations('Layout');
  const locale = useLocale();
  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/study', label: t('studySession'), icon: BookOpen },
    { href: '/generate', label: t('generateQuestions'), icon: Sparkles },
    { href: '/manage', label: t('manageSets'), icon: Settings },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('toggleNav')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="">{t('appName')}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const fullPath = `/${locale}${href}`;
              const isActive = pathname.startsWith(fullPath);
              return (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { 'bg-muted text-primary': isActive }
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )})}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserMenu() {
  const t = useTranslations('Layout');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://picsum.photos/50/50" alt="User avatar" data-ai-hint="person face" width={50} height={50} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="sr-only">{t('toggleUserMenu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
        <DropdownMenuItem>{t('support')}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
