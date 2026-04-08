import { openDB } from 'idb';

const DB_NAME = 'JobTrackerBuddyDB';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jobs')) {
        const jobStore = db.createObjectStore('jobs', { keyPath: 'id' });
        jobStore.createIndex('status', 'status');
        jobStore.createIndex('dateApplied', 'dateApplied');
        jobStore.createIndex('priority', 'priority');
        jobStore.createIndex('followUpDate', 'followUpDate');
        jobStore.createIndex('createdAt', 'createdAt');
      }
      
      if (!db.objectStoreNames.contains('resumes')) {
        db.createObjectStore('resumes', { keyPath: 'name' });
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }

      if (!db.objectStoreNames.contains('activityLog')) {
        const logStore = db.createObjectStore('activityLog', { keyPath: 'id' });
        logStore.createIndex('jobId', 'jobId');
        logStore.createIndex('timestamp', 'timestamp');
      }
    },
  });
}

// Basic wrapper operations to reduce boilerplate
export const dbOps = {
  async getAll(storeName) {
    const db = await initDB();
    return db.getAll(storeName);
  },
  async get(storeName, key) {
    const db = await initDB();
    return db.get(storeName, key);
  },
  async put(storeName, val) {
    const db = await initDB();
    return db.put(storeName, val);
  },
  async delete(storeName, key) {
    const db = await initDB();
    return db.delete(storeName, key);
  },
  async getAllFromIndex(storeName, indexName, key) {
    const db = await initDB();
    return db.getAllFromIndex(storeName, indexName, key);
  }
};
