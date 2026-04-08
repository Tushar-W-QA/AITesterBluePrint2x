import { useState, useMemo } from 'react';

export function useSearch(jobs) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: '',
    workMode: '',
    status: '',
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter(job => {
      // Text search
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || (
        (job.company || '').toLowerCase().includes(term) ||
        (job.role || '').toLowerCase().includes(term) ||
        (job.location || '').toLowerCase().includes(term) ||
        (job.notes || '').toLowerCase().includes(term) ||
        (job.tags || []).some(t => t.toLowerCase().includes(term))
      );

      // Filters
      const matchesPriority = !filters.priority || job.priority === filters.priority;
      const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode;
      const matchesStatus = !filters.status || job.status === filters.status;

      return matchesSearch && matchesPriority && matchesWorkMode && matchesStatus;
    });
  }, [jobs, searchTerm, filters]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ priority: '', workMode: '', status: '' });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return { searchTerm, setSearchTerm, filters, setFilters, filteredJobs, resetFilters, activeFilterCount };
}
