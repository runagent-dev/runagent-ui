'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export async function syncUser() {
  const { userId, user } = await auth();
  
  if (!userId || !user) {
    throw new Error('User not authenticated');
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (existingUser) {
    // Update existing user
    await db.update(users)
      .set({
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        imageUrl: user.imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  } else {
    // Create new user
    await db.insert(users).values({
      id: userId,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      imageUrl: user.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 