import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true, // uniquement test, à retirer en production
  tlsInsecure: true, // selon version du driver
});

async function connect() {
  try {
    await client.connect();
    console.log('Connexion MongoDB réussie');
  } catch (error) {
    console.error('Erreur connexion MongoDB:', error);
  }
}

connect();
