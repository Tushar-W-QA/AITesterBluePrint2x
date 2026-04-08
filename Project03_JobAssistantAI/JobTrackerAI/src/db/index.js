import { openDB } from 'idb';

const DB_NAME = 'JobTrackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'jobs';

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('status', 'status');
        store.createIndex('createdAt', 'createdAt');
      }
    },
  });
};

export const getJobs = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addJob = async (job) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(job);
  await tx.done;
  return job;
};

export const updateJob = async (job) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(job);
  await tx.done;
  return job;
};

export const deleteJob = async (id) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};

export const clearJobs = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.clear();
  await tx.done;
};
