import { NextResponse } from 'next/server';
import { syncUser } from '../../actions';

export async function POST() {
  try {
    await syncUser();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
} 