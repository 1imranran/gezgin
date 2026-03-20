import { NextResponse } from 'next/server';
import { getTodayPlace } from '@/services/placeService';

export async function GET() {
  try {
    const place = await getTodayPlace();
    return NextResponse.json(place);
  } catch (error) {
    return NextResponse.json({ error: 'Mekan getirilemedi' }, { status: 500 });
  }
}
