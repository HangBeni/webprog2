import  sqlite3  from "sqlite3";

const DBSOURCE = "db.sqlite";
sqlite3.verbose();
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    db.run(
      `CREATE TABLE band (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE NOT NULL, 
            birth text, 
            genre text NOT NULL, 
            story text NOT NULL, 
            CONSTRAINT name_unique UNIQUE (name)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO band (name, birth, genre, story) VALUES (?,?,?,?)";
          db.run(insert, ["FFTS", "2021-01-01", "metál", "Bsazó emberek"]);
        }
      }
    );

    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE NOT NULL, 
            band text NOT NULL,
            password text NOT NULL,
            CONSTRAINT name_unique, password_unique UNIQUE (name, password)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          var insert = "INSERT INTO user (name, band, password) VALUES (?,?,?)";
          db.run(insert, ["Benjámin", "FFTS", "12345"]);
        }
      }
    );

    db.run(
      `CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author text NOT NULL, 
            content text NOT NULL,
            CONSTRAINT id_unique UNIQUE(id)
        )`,
      (err) => {
        if (err) {
          // Table already created
        } 
      }
    );

  }
});

export default db;