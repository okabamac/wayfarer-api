import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utils/config';

const { psqlUrl, psqlTest } = keys;

const createTables = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS trips;
  CREATE TABLE IF NOT EXISTS
  users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL UNIQUE,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    password VARCHAR(150) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  trips(
    trip_id SERIAL PRIMARY KEY,
    bus_id INTEGER NOT NULL,
    origin VARCHAR(150) NOT NULL ,
    destination VARCHAR(150) NOT NULL ,
    fare FLOAT NOT NULL,
    trip_date TIMESTAMP,
    created_by INTEGER NOT NULL
  );
`;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl,
});
pool.on('connect', () => {
  console.log('Connected to database');
});

async function create() {
  await pool.query(createTables);
  console.log('Creating Tables...');
  pool.end();
}
create();
