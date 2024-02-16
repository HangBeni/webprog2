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
		`CREATE TABLE band (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL, 
        birth text NOT NULL, 
        genre text NOT NULL, 
        story text NOT NULL, 
        UNIQUE(name)
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
		`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text  NOT NULL, 
            band text NOT NULL,
            password text NOT NULL,
            UNIQUE(name, password)
            )`,
		(err) => {
			if (err) {
				// Table already created
			} else {
				var insert = 'INSERT INTO user (name, band, password) VALUES (?,?,?)';
				db.run(insert, ['Benjámin', 'FFTS', '12345']);
			}
		}
	);

	db.run(
		`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author text NOT NULL, 
            content text NOT NULL,
            )`,
		(err) => {
			if (err) {
				// Table already created
			}
		}
	);
});

export default db;
