import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SecurePage() {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get('session_user')?.value;
  if (!sessionUser) {
    redirect('/login');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Secure Page</h1>
      <p className="mt-4">Welcome, {sessionUser}</p>
    </main>
  );
}
