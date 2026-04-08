import { openDB } from 'idb';
import { DB_NAME, DB_VERSION, STORES } from './constants';

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORES.JOBS)) {
        const jobsStore = db.createObjectStore(STORES.JOBS, { keyPath: 'id' });
        jobsStore.createIndex('status', 'status');
        jobsStore.createIndex('dateApplied', 'dateApplied');
        jobsStore.createIndex('priority', 'priority');
        jobsStore.createIndex('followUpDate', 'followUpDate');
        jobsStore.createIndex('createdAt', 'createdAt');
      }

      if (!db.objectStoreNames.contains(STORES.RESUMES)) {
        db.createObjectStore(STORES.RESUMES, { keyPath: 'name' });
      }

      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }

      if (!db.objectStoreNames.contains(STORES.ACTIVITY_LOG)) {
        const logStore = db.createObjectStore(STORES.ACTIVITY_LOG, { keyPath: 'id' });
        logStore.createIndex('jobId', 'jobId');
        logStore.createIndex('timestamp', 'timestamp');
      }
    },
  });
};

const dbPromise = initDB();

export const dbRequest = async (storeName, action, ...args) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, action === 'get' || action === 'getAll' ? 'readonly' : 'readwrite');
  const store = tx.objectStore(storeName);
  const result = await store[action](...args);
  await tx.done;
  return result;
};

// Simplified CRUD
export const jobsDb = {
  getAll: () => dbRequest(STORES.JOBS, 'getAll'),
  get: (id) => dbRequest(STORES.JOBS, 'get', id),
  put: (job) => dbRequest(STORES.JOBS, 'put', job),
  delete: (id) => dbRequest(STORES.JOBS, 'delete', id),
};

export const resumesDb = {
  getAll: () => dbRequest(STORES.RESUMES, 'getAll'),
  put: (resume) => dbRequest(STORES.RESUMES, 'put', resume),
  delete: (name) => dbRequest(STORES.RESUMES, 'delete', name),
};

export const settingsDb = {
  get: (key) => dbRequest(STORES.SETTINGS, 'get', key),
  put: (setting) => dbRequest(STORES.SETTINGS, 'put', setting),
};

export const activityLogDb = {
  getByJobId: async (jobId) => {
    const db = await dbPromise;
    return db.getAllFromIndex(STORES.ACTIVITY_LOG, 'jobId', jobId);
  },
  add: (entry) => dbRequest(STORES.ACTIVITY_LOG, 'add', entry),
};
