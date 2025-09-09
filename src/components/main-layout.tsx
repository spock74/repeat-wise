
'use client';

import { useTranslations } from 'next-intl';
import {
  BookOpen,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

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
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/navigation';
import { useThemeStore } from '@/store/theme';
import { useAnimationStore } from '@/store/animation';


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-card/60 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <MobileSidebar />
            <div className="w-full flex-1" />
            <SettingsMenu />
            <LocaleSwitcher />
            <UserMenu />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    router.replace(pathname, {locale: value});
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

function ThemeSettingsDialog() {
  const { setTheme } = useThemeStore();
  const t = useTranslations('Layout');

  const themes: {name: any, label: string}[] = [
    { name: 'theme-orange', label: 'Orange' },
    { name: 'theme-blue', label: 'Blue' },
    { name: 'theme-green', label: 'Green' },
    { name: 'theme-purple', label: 'Purple' },
    { name: 'theme-dark', label: 'Dark' },
  ];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('colorScheme')}</DialogTitle>
        <DialogDescription>{t('colorSchemeDescription')}</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <Button
            key={theme.name}
            variant="outline"
            onClick={() => setTheme(theme.name)}
          >
            {theme.label}
          </Button>
        ))}
      </div>
    </DialogContent>
  );
}


function SettingsMenu() {
  const t = useTranslations('Layout');
  const [open, setOpen] = useState(false);
  const { useCardAnimation, toggleCardAnimation } = useAnimationStore();


  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">{t('settings')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('settings')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              {t('colorScheme')}
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuCheckboxItem
            checked={useCardAnimation}
            onCheckedChange={toggleCardAnimation}
          >
            {t('useCardAnimations')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem>{t('support')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeSettingsDialog />
    </Dialog>
  );
}


function SidebarNav() {
  const pathname = usePathname();
  const t = useTranslations('Layout');
  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/study', label: t('studySession'), icon: BookOpen },
    { href: '/generate', label: t('generateQuestions'), icon: Sparkles },
    { href: '/manage', label: t('manageSets'), icon: Settings },
  ];
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-primary/10 text-primary': isActive }
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
    <aside className="hidden border-r bg-card/60 backdrop-blur-sm md:block">
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
      <SheetContent side="left" className="flex flex-col p-0 bg-card/80 backdrop-blur-sm">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="">{t('appName')}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { 'bg-primary/10 text-primary': isActive }
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
            <AvatarImage src="https://picsum.photos/50/50" alt="User avatar" data-ai-hint="person face" />
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
