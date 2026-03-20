import { NextResponse } from 'next/server';
import { getArchivedPlaces } from '@/services/placeService';

export async function GET() {
  const places = await getArchivedPlaces();
  return NextResponse.json(places);
}
