const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  port: "5432",
  user: 'postgres',
  password: 'postgres'
});

async function saveDataToDatabase(data) {
  try {
    // Create the "ads" table if it doesn't exist
    await pool.query(` 
      CREATE TABLE IF NOT EXISTS ads (
        id SERIAL PRIMARY KEY,
        image TEXT,
        title TEXT,
        href TEXT
      );
    `);

    const insertQuery = 'INSERT INTO ads (image, title, href) VALUES ($1, $2, $3)';
    const values = data.map((item) => [item.image, item.title, item.href]);

    await Promise.all(
      values.map((params) => pool.query(insertQuery, params))
    );

    //~ deleting all data: DELETE FROM ads
    //~ ALTER SEQUENCE ads_id_seq RESTART WITH 1

    console.log('db success!');
    return data;
  } catch (err) { 
    console.log(err);
  }
}

module.exports = saveDataToDatabase;