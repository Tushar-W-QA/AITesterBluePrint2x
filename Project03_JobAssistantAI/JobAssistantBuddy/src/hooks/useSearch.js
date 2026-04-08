import { useState, useMemo } from 'react';

export const useSearch = (jobs) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    workMode: '',
    jobType: '',
    resume: '',
    dateRange: null,
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search logic
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        job.company?.toLowerCase().includes(searchLower) ||
        job.role?.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower) ||
        job.notes?.toLowerCase().includes(searchLower) ||
        job.tags?.some(tag => tag.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;

      // Filter logic
      if (filters.status && job.status !== filters.status) return false;
      if (filters.priority && job.priority !== filters.priority) return false;
      if (filters.workMode && job.workMode !== filters.workMode) return false;
      if (filters.jobType && job.jobType !== filters.jobType) return false;
      if (filters.resume && job.resume !== filters.resume) return false;

      return true;
    });
  }, [jobs, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      workMode: '',
      jobType: '',
      resume: '',
      dateRange: null,
    });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).filter(v => !!v).length;

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredJobs,
    clearFilters,
    activeFilterCount,
  };
};
