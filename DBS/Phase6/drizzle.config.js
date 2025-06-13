// drizzle.config.js
const { defineConfig } = require('drizzle-kit');
const { parse } = require('pg-connection-string');

const parsed = parse(process.env.DATABASE_URL);

module.exports = defineConfig({
  schema: './db/models/schema.js',
  out: './db/migrations',
  dbCredentials: {
    host: parsed.host,
    port: parsed.port ? parseInt(parsed.port, 10) : undefined,
    user: parsed.user,
    password: parsed.password,
    database: parsed.database,
    ssl: false
  },
  dialect: 'postgresql',
  strict: true,
  verbose: true,
});
