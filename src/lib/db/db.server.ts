import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { bands, posts } from './schema';
import * as schema from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

await db
	.insert(bands)
	.values({ name: 'FFTS', story: 'Baszó emberek', genre: 'Metáál', birth: '2021-01-01' })
	.onConflictDoNothing({ target: bands.name });

await db
	.insert(posts)
	.values({ author: 'Beni', content: 'Az FFTS a legbaszóbb banda' })
	.onConflictDoNothing({ target: bands.name });
