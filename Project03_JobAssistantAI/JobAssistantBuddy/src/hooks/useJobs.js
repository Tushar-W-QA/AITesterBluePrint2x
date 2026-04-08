import { useState, useEffect, useCallback } from 'react';
import { jobsDb, activityLogDb, resumesDb } from '../lib/db';
import { uid } from '../lib/utils';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await jobsDb.getAll();
      setJobs(data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = async (jobData) => {
    const job = {
      ...jobData,
      id: uid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activityLog: [{
        action: 'Created',
        timestamp: new Date().toISOString(),
        note: 'Initial entry'
      }]
    };

    try {
      await jobsDb.put(job);
      // Log activity in separate store
      await activityLogDb.add({
        id: uid(),
        jobId: job.id,
        action: 'Created',
        timestamp: job.createdAt,
        note: 'Initial entry'
      });
      
      // Update resume store if new resume name used
      if (job.resume) {
        const resumes = await resumesDb.getAll();
        if (!resumes.find(r => r.name === job.resume)) {
          await resumesDb.put({ name: job.resume, createdAt: new Date().toISOString(), usageCount: 1 });
        } else {
          const r = resumes.find(res => res.name === job.resume);
          await resumesDb.put({ ...r, usageCount: (r.usageCount || 0) + 1 });
        }
      }

      setJobs(prev => [job, ...prev]);
      return job;
    } catch (err) {
      setError('Failed to add job');
      throw err;
    }
  };

  const updateJob = async (id, updates) => {
    try {
      const existingJob = jobs.find(j => j.id === id);
      if (!existingJob) return;

      const updatedJob = {
        ...existingJob,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Handle activity log if status changed
      if (updates.status && updates.status !== existingJob.status) {
        const logEntry = {
          action: 'Status Change',
          fromStatus: existingJob.status,
          toStatus: updates.status,
          timestamp: updatedJob.updatedAt,
          note: updates.moveNote || ''
        };
        updatedJob.activityLog = [...(updatedJob.activityLog || []), logEntry];
        
        await activityLogDb.add({
          id: uid(),
          jobId: id,
          ...logEntry
        });
      }

      await jobsDb.put(updatedJob);
      setJobs(prev => prev.map(j => j.id === id ? updatedJob : j));
      return updatedJob;
    } catch (err) {
      setError('Failed to update job');
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await jobsDb.delete(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err) {
      setError('Failed to delete job');
      throw err;
    }
  };

  return { jobs, loading, error, addJob, updateJob, deleteJob, refresh: fetchJobs };
};
