import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  console.log("Attempting to connect to:", process.env.DATABASE_URL?.split('@')[1]);
  try {
    await client.connect();
    console.log("SUCCESS! Connected to Neon DB.");
    const res = await client.query('SELECT 1 as val');
    console.log("Query result:", res.rows);
  } catch (err) {
    console.error("FAILED to connect to Neon DB:");
    console.error(err);
  } finally {
    await client.end();
  }
}

test();
