# Günlük Öneri Sitesi (Gezgin) - Architecture Blueprint

## 1. System Overview
A daily recommendation website where visitors get one "Place of the Day" recommendation. Users can upvote/downvote it. Past data is indexed and accessible, and there is a leaderboard for the best-voted places.

## 2. Tech Stack
-   **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
-   **Backend:** Next.js API Routes (Server Actions / Route Handlers)
-   **Database:** SQLite via Prisma ORM
-   **Testing:** Jest, React Testing Library
-   **Deployment:** Docker

## 3. Database Schema (Prisma / SQLite)
```prisma
model Place {
  id          String   @id @default(uuid())
  name        String
  description String
  imageUrl    String
  recommendedOn DateTime @unique // YYYY-MM-DD
  upvotes     Int      @default(0)
  createdAt   DateTime @default(now())
}
```

## 4. Directory Structure
```
/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── page.tsx (Today's recommendation & voting)
│   │   ├── archive/page.tsx (Past recommendations)
│   │   ├── leaderboard/page.tsx (Top voted places)
│   │   ├── api/
│   │       ├── vote/route.ts
│   ├── components/
│   │   ├── PlaceCard.tsx
│   │   ├── Navbar.tsx
│   ├── lib/
│   │   └── prisma.ts
```

## 5. UI/UX Design
-   **Theme:** Modern, minimalistic, dark-mode ready, glassmorphism elements.
-   **Animations:** Framer motion page transitions and hover effects on cards and vote buttons.

## 6. Testing Strategy (TDD)
-   **Unit Tests:** Testing of utility functions, Prisma connection setup.
-   **Integration Tests:** API endpoints for voting and retrieving places.
-   **Security:** Ensure SQL injection prevention (Prisma handles this natively), limit voting via localStorage or simple IP rate limiting.
