import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/services/placeService';

export async function GET() {
  const places = await getLeaderboard();
  return NextResponse.json(places);
}
