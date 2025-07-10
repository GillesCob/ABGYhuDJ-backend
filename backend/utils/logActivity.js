import { connect } from '../mongo.js';

export async function logActivity(userId, action) {
  try {
    const db = await connect();
    const collection = db.collection('activity_logs');
    await collection.insertOne({
      userId,
      action,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du log:', error);
  }
}
