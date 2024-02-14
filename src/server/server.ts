import express, { type Express, type Request, type Response } from 'express';
import db from '../database/db';

const app: Express = express();
const PORT = 42069;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

//felvesz egy új bandát az adatbázisba
app.post('/registration/band', (req: Request, res: Response) => {
	const data = req.body;
	var insert = 'INSERT INTO band (name, birth, genre, story) VALUES (?, ?, ?, ?)';
	db.serialize(() => {
		db.run(insert, [data.bandName, data.bandBirth, data.genres, data.backStory], (err) => {
			if (err) {
				res.status(418).send({ res: "Smth went wrong! I can't insert to the table!" });
			} else {
				res.status(201).send([data.bandName, data.genres]);
			}
		});
	});
});

app.post('/registration/user', (req: Request, res: Response) => {
	const { userName, userPsswrd, userBand } = req.body;
	var insert = 'INSERT INTO user (name, band, password) VALUES (?, ?, ?)';

	db.serialize(() => {
		db.run(insert, [userName, userBand, userPsswrd], (err) => {
			if (err) {
				res.status(418).send({ res: 'Smth went wrong! Maybe there is a same user as you XD' });
			} else {
				res.status(200).send({ res: `It's okay u good ${userName}` });
			}
		});
	});
});

//Megvizsgálja hogy van e ilyen felhasználó az adatbázisban
app.post('/login/user', (req: Request, res: Response) => {
	const { userName, userPsswrd } = req.body;
	var query = 'SELECT * FROM user WHERE name = ? AND password = ?;';
	db.get(query, [userName, userPsswrd], (err, row) => {
		if (err || !row) {
			res.status(418).send({ logged: false, user: row });
		} else {
			res.status(200).send({ logged: true, user: row });
		}
	});
});

//Az összes bandát kilistázza
app.get('/allBand', (req: Request, res: Response) => {
	db.all('SELECT * FROM band;', (err, row) => {
		if (err) {
			console.error(err.message);
			throw err;
		} else {
			res.send(row);
		}
	});
});

app.get('/allUser', (req: Request, res: Response) => {
	db.all('SELECT * FROM user;', (err, row) => {
		if (err) {
			console.error(err.message);
			throw err;
		} else {
			res.send(row);
		}
	});
});

//ID alapján töröl egy bandát
app.delete('/deleteBand/:id', (req: Request, res: Response) => {
	db.serialize(() => {
		db.run('DELETE FROM band WHERE id = ?;', req.params.id, (err) => {
			if (err) {
				res.status(418).send({ res: `Smth went wrong! I can\'t delete the ${req.params.id}` });
			} else {
				res.status(301);
			}
		});
	});
});

//ID alapján töröl egy felhasználót
app.delete('/deleteUser/:id', (req: Request, res: Response) => {
	db.serialize(() => {
		db.run('DELETE FROM user WHERE id = ?;', req.params.id, (err) => {
			if (err) {
				res.status(418).send({ res: `Smth went wrong! I can\'t delete ${req.params.id}` });
			} else {
				res.status(301).send({ id: 'Deleted user: ' + req.params.id });
			}
		});
	});
});
