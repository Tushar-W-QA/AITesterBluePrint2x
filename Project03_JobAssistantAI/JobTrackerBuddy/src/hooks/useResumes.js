import { useState, useEffect } from 'react';
import { dbOps } from '../lib/db';

export function useResumes() {
  const [resumes, setResumes] = useState([]);

  const loadResumes = async () => {
    try {
      const data = await dbOps.getAll('resumes');
      setResumes(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const addResume = async (name, url) => {
    const newResume = { name, url, usageCount: 0, createdAt: new Date().toISOString() };
    await dbOps.put('resumes', newResume);
    await loadResumes();
  };

  const deleteResume = async (name) => {
    await dbOps.delete('resumes', name);
    await loadResumes();
  };

  return { resumes, addResume, deleteResume };
}
