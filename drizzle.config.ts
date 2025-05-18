import type { Config } from 'drizzle-kit';

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-proud-paper-a8rqldhi-pooler.eastus2.azure.neon.tech',
    user: 'neondb_owner',
    password: 'npg_wT9kqEegy3vo',
    database: 'neondb',
    ssl: 'require'
  },
} satisfies Config; 