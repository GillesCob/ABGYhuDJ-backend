import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

let db;

export async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME);
    console.log('Connecté à MongoDB');
  }
  return db;
}
