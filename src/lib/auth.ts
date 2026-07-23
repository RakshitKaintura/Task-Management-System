import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;
  
  if (!sessionToken) {
    return null;
  }

  const payload = await decrypt(sessionToken);
  if (!payload || !payload.userId) {
    return null;
  }
  
  return payload.userId;
}

export async function getCurrentUser() {
  const userId = await verifyAuth();
  if (!userId) {
    return null;
  }
  
  await dbConnect();
  
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}
