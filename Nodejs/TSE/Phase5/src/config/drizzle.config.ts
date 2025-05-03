import { defineConfig } from "drizzle-kit";
import 'dotenv/config';
import { parse } from 'pg-connection-string';

const parsed = parse(process.env.DATABASE_URL as string);

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: parsed.host as string,
    port: parsed.port ? parseInt(parsed.port) : undefined,
    user: parsed.user,
    password: parsed.password,
    database: parsed.database as string,
  }
});
