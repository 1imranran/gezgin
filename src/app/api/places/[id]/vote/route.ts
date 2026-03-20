import { NextResponse } from 'next/server';
import { votePlace } from '@/services/placeService';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { isUpvote } = await req.json();
    const updated = await votePlace(id, isUpvote);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Oylama işlemi başarısız' }, { status: 500 });
  }
}
