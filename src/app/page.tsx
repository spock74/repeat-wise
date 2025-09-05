import { redirect } from 'next/navigation';

// This is the root page, which redirects to the default locale's dashboard.
export default function RootPage() {
  redirect('/pt/dashboard');
}
