import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { bands } from './schema';

const sqlite = new Database('sqlite.db');
export const db: BetterSQLite3Database = drizzle(sqlite);

db.insert(bands)
	.values({ name: 'FFTS', story: 'Baszó emberek', genre: 'Metáál', birth: '2021-01-01' })
	.onConflictDoNothing({ target: bands.name });
