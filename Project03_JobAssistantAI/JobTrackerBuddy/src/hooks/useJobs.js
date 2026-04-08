import { useState, useEffect } from 'react';
import { dbOps } from '../lib/db';
import { uid } from '../lib/utils';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const data = await dbOps.getAll('jobs');
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const addJob = async (jobData) => {
    const job = {
      ...jobData,
      id: uid(),
      dateApplied: jobData.dateApplied || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const log = {
      id: uid(),
      jobId: job.id,
      action: 'Created',
      toStatus: job.status,
      timestamp: new Date().toISOString()
    };
    
    await dbOps.put('jobs', job);
    await dbOps.put('activityLog', log);
    await loadJobs();
    return job;
  };

  const updateJob = async (jobData) => {
    const job = { ...jobData, updatedAt: new Date().toISOString() };
    await dbOps.put('jobs', job);
    await loadJobs();
  };

  const updateJobStatus = async (jobId, newStatus) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job || job.status === newStatus) return;

    const oldStatus = job.status;
    const updatedJob = { ...job, status: newStatus, updatedAt: new Date().toISOString() };
    
    const log = {
      id: uid(),
      jobId: job.id,
      action: 'Status Changed',
      fromStatus: oldStatus,
      toStatus: newStatus,
      timestamp: new Date().toISOString()
    };

    setJobs(prev => prev.map(j => j.id === jobId ? updatedJob : j));
    
    try {
      await dbOps.put('jobs', updatedJob);
      await dbOps.put('activityLog', log);
    } catch (e) {
      await loadJobs();
    }
  };

  const deleteJob = async (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    await dbOps.delete('jobs', jobId);
  };

  return { jobs, loading, addJob, updateJob, updateJobStatus, deleteJob };
}
