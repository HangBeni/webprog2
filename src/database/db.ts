import type { Band } from '$lib/types';
import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.db';

sqlite3.verbose();

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log('Connected to the SQLite database.');
	}
});

db.serialize(() => {
	db.run(
		`CREATE TABLE IF NOT EXISTS band (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL, 
        birth text NOT NULL, 
        genre text NOT NULL, 
        story text NOT NULL,
		UNIQUE(id,name) 
        )`,
		(err) => {
			if (err) {
				// Table already created
			} else {
				// Table just created, creating some rows
				var insert = 'INSERT INTO band (name, birth, genre, story) VALUES (?,?,?,?)';
				db.run(insert, ['FFTS', '2021-01-01', 'metál', 'Bsazó emberek']);
			}
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            band TEXT NOT NULL,
            band_id INTEGER NOT NULL,
            password TEXT NOT NULL,
            UNIQUE(name, password),
            FOREIGN KEY(band_id) REFERENCES band(id)
            )`,
		(err) => {
			if (err) {
				console.log('user table error');
				console.error(err);
			} else {
				db.get('SELECT id FROM band WHERE name = ?', ['FFTS'], (err, row: Band) => {
					if (err) {
						console.error(err);
					} else {
						var insert = 'INSERT OR IGNORE INTO user (name, band, band_id, password) VALUES (?,?,?,?);';
						db.run(insert, ['Benjámin', 'FFTS', row.id, '12345']);
					}
				});
			}
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT NOT NULL, 
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            modified_at DATETIME
            )`,
		(err) => {
			if (err) {
				console.log('Post table error!');
				console.error(err);
			} else {
			}
		}
	);
	db.run(
		`CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
			post_id INTEGER NOT NULL,
            author text NOT NULL, 
            content text NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			modified_at DATETIME,
			FOREIGN KEY (post_id) REFERENCES posts(id)
            )`,
		(err) => {
			if (err) {
				console.log('Comment table error!');
				console.error(err);
			} else {
			}
		}
	);
});
export default db;
