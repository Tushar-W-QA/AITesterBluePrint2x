import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../db';

export const useJobStore = create((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,
  
  // Initialize and load jobs from DB
  loadJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const dbJobs = await db.getJobs();
      set({ jobs: dbJobs, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add a new job
  addJob: async (jobData) => {
    const newJob = {
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: jobData.status || 'wishlist', // default to wishlist
      ...jobData
    };
    
    try {
      await db.addJob(newJob);
      set((state) => ({ jobs: [...state.jobs, newJob] }));
    } catch (error) {
      console.error('Failed to add job:', error);
      throw error;
    }
  },

  // Update existing job
  updateJob: async (id, jobData) => {
    try {
      const state = get();
      const jobList = state.jobs;
      const index = jobList.findIndex(j => j.id === id);
      if (index === -1) return;
      
      const updatedJob = { ...jobList[index], ...jobData, updatedAt: Date.now() };
      await db.updateJob(updatedJob);
      
      set((state) => ({
        jobs: state.jobs.map(job => job.id === id ? updatedJob : job)
      }));
    } catch (error) {
      console.error('Failed to update job:', error);
      throw error;
    }
  },

  // Delete job
  deleteJob: async (id) => {
    try {
      await db.deleteJob(id);
      set((state) => ({
        jobs: state.jobs.filter(job => job.id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete job:', error);
      throw error;
    }
  },

  // Clear all jobs
  clearAllJobs: async () => {
    try {
      await db.clearJobs();
      set({ jobs: [] });
    } catch (error) {
       console.error('Failed to clear jobs:', error);
       throw error;
    }
  }
}));
