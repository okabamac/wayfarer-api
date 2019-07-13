import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/config.util';

const { psqlUrl, psqlTest } = keys;

const createTables = `
  DROP TABLE IF EXISTS bookings, trips, buses, users CASCADE;
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
  buses(
    bus_id SERIAL PRIMARY KEY,
    number_plate VARCHAR(150) NOT NULL,
    manufacturer VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    year VARCHAR(150) NOT NULL,
    capacity INTEGER NOT NULL,
    registered_by INTEGER NOT NULL,
    CONSTRAINT FK_bus_registered_by FOREIGN KEY (registered_by) REFERENCES users (user_id)
  );
  CREATE TABLE IF NOT EXISTS
  trips(
    trip_id SERIAL PRIMARY KEY,
    bus_id INTEGER NOT NULL,
    origin VARCHAR(150) NOT NULL ,
    destination VARCHAR(150) NOT NULL,
    fare FLOAT NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    status VARCHAR(100) NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(user_id),
    bus_capacity INTEGER NOT NULL,
    CONSTRAINT FK_trip_created_by FOREIGN KEY (created_by) REFERENCES users (user_id)
  );
  CREATE TABLE IF NOT EXISTS
  bookings(
    booking_id SERIAL, 
    user_id INTEGER NOT NULL,
    trip_id INTEGER NOT NULL,
    bus_id INTEGER NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    seat_number SERIAL NOT NULL,
    created_on TIMESTAMP NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    CONSTRAINT PK_booking_id PRIMARY KEY(trip_id, user_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT FK_trip_id FOREIGN KEY (trip_id) REFERENCES trips (trip_id),
    CONSTRAINT FK_bus_id FOREIGN KEY (bus_id) REFERENCES buses (bus_id),
    CONSTRAINT FK_email FOREIGN KEY (email) REFERENCES users (email)
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
