import dotenv from 'dotenv';
import { Pool } from 'pg';

import moment from 'moment';
import keys from '../utils/config';

const { psqlUrl, psqlTest } = keys;

const date = moment(new Date());
const tableSeeds = `
  INSERT INTO
    users
      VALUES 
      ( default, 'markokaba99@gmail.com', 'Mac', 'Okaba', ${true}, '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni'),
      ( default, 'aminuaminu@g.com', 'Aminu', 'Tokien', ${false}, '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni');
  INSERT INTO
    trips
      VALUES 
      ( default, 20, 'Ogun', 'Oyo', 2010.033, '${date}', 1),
      ( default, 25, 'Ogoja', 'Calabar', 123.00, '${date}', 1);
`;
dotenv.config();
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl,
});

pool.on('connect', () => {
  console.log('Database connection has been established');
});

async function seeder() {
  await pool.query(tableSeeds);
  console.log('Tables are being seeded...');
  pool.end();
}
seeder();
