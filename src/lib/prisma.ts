import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === 'production') {
    const dbPath = path.join(process.cwd(), 'dev.db');
    const tmpPath = '/tmp/dev.db';

    try {
      // Vercel filesystem is read-only except for /tmp.
      // Copy the database so we can read and write to it.
      if (fs.existsSync(dbPath)) {
        if (!fs.existsSync(tmpPath)) {
          fs.copyFileSync(dbPath, tmpPath);
        }
      }
    } catch (e) {
      console.error('Failed to copy SQLite database to /tmp', e);
    }

    // @ts-ignore - Prisma 5 type definitions sometimes hide datasources when engineType is library
    return new PrismaClient({
      datasources: {
        db: {
          url: 'file:/tmp/dev.db',
        },
      },
    })
  }

  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
