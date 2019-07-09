import dotenv from 'dotenv';

dotenv.config();
const keys = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  psqlUrl: process.env.DATABASE_URL,
  psqlTest: process.env.DATABASE_TEST_URL,
};
export default keys;
