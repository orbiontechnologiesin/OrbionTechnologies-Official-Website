import fs from 'fs';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const env = dotenv.parse(fs.readFileSync('.env.local', 'utf8'));
if (!env.DATABASE_URL) {
  console.error('FAIL: DATABASE_URL not found in .env.local');
  process.exit(1);
}

process.env.DATABASE_URL = env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
  log: ['error'],
});

async function main() {
  try {
    console.log('Testing connection to Neon PostgreSQL via PrismaClient...');
    const result = await prisma.$queryRaw`SELECT version(), current_database(), current_user;`;
    console.log('PASS: Successfully connected to Neon database!');
    console.log('Database name:', result[0]?.current_database);
    console.log('PostgreSQL version:', (result[0]?.version || '').split(' ')[0], (result[0]?.version || '').split(' ')[1]);

    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log('Existing tables in public schema:', tables.map(t => t.table_name));

    const migrations = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = '_prisma_migrations'
      );
    `;
    console.log('Has _prisma_migrations table:', migrations[0]?.exists);

    if (migrations[0]?.exists) {
      const applied = await prisma.$queryRaw`
        SELECT id, migration_name, finished_at 
        FROM _prisma_migrations 
        ORDER BY finished_at ASC;
      `;
      console.log('Applied migrations:', applied.map(m => m.migration_name));
    }
  } catch (err) {
    console.error('FAIL: Database query failed:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
