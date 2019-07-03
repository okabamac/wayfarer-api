import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utils/config';

const { psqlUrl, psqlTest } = keys;
dotenv.config();

const db = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl,
});

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


export default db;
