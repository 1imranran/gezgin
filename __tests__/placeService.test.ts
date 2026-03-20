/**
 * @jest-environment node
 */
import { getTodayPlace, votePlace, getLeaderboard, getArchivedPlaces } from '@/services/placeService';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

describe('Place Service TDD', () => {
  beforeAll(async () => {
    await prisma.place.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('bugün için mekan yoksa yeni bir tane getirmeli (yaratmalı)', async () => {
    const place = await getTodayPlace();
    expect(place).toBeDefined();
    expect(place.recommendedOn).toBe(format(new Date(), "yyyy-MM-dd"));
  });

  it('mekana upvote vermelidir', async () => {
    const place = await getTodayPlace();
    const initialUpvotes = place.upvotes;
    
    const updated = await votePlace(place.id, true);
    expect(updated.upvotes).toBe(initialUpvotes + 1);
  });

  it('liderlik sıralaması dönmelidir', async () => {
    const leaderboard = await getLeaderboard();
    expect(leaderboard.length).toBeGreaterThan(0);
  });

  it('SQL Injection denemelerine karşı (ORM tabanlı koruma) hata vermelidir veya etkilenmemelidir', async () => {
    const sqliPayload = "' OR 1=1 --";
    // Eğer böyle bir id yoksa Prisma 'Record to update not found' hatası fırlatır.
    await expect(votePlace(sqliPayload, true)).rejects.toThrow();
  });
});
