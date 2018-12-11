import Datastore from 'nedb';
import electron from 'electron';

const dbPath = `${(electron.app || electron.remote.app).getPath(
  'userData'
)}/portan.db`;
const db = new Datastore({
  filename: dbPath
});

db.loadDatabase();

export default db;
