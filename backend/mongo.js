import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  ssl: true,
  minVersion: 'TLSv1.2', // IMPORTANT pour éviter l'erreur TLS
});

let db;

export async function connect() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(process.env.MONGODB_DB_NAME);
      console.log('✅ Connecté à MongoDB');
    } catch (err) {
      console.error('❌ Erreur de connexion MongoDB :', err);
      throw err;
    }
  }
  return db;
}
