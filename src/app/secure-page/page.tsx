import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '@/db/connect';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function SecurePage() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const sessionEmail = cookieStore.get('session_user')?.value;
  
  if (!sessionEmail) {
    redirect('/login');
  }
  
  // Verify user exists in database
  const userResults = await db.select().from(users).where(eq(users.email, sessionEmail));
  
  if (userResults.length === 0) {
    redirect('/login');
  }
  
  const user = userResults[0];
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Secure Page</h1>
      <p className="mb-4">This content is only visible to authenticated users.</p>
      <div className="p-4 bg-green-100 border border-green-300 rounded-md">
        <p className="text-green-800">
          You are successfully authenticated! Your session is valid.
        </p>
      </div>
    </div>
  );
}
