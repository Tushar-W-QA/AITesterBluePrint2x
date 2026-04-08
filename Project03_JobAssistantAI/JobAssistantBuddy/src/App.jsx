import React, { useState, useEffect, useMemo } from 'react';
import { useJobs } from './hooks/useJobs';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';
import { useSettings } from './hooks/useSettings';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Header } from './components/Header/Header';
import { SearchBar } from './components/Header/SearchBar';
import { Board } from './components/Board/Board';
import { Dashboard } from './components/Dashboard/Dashboard';
import { JobSlideOver } from './components/Forms/JobSlideOver';
import { ResumeManager } from './components/Forms/ResumeManager';
import { FilterModal } from './components/Filters/FilterModal';
import { exportData, importData } from './lib/export';
import { resumesDb } from './lib/db';

function App() {
  const { jobs, loading, addJob, updateJob, deleteJob, refresh } = useJobs();
  const { isDark, toggleTheme } = useTheme();
  const { settings, updateSetting } = useSettings();
  const [view, setView] = useState('board');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [isResumeManagerOpen, setIsResumeManagerOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const data = await resumesDb.getAll();
      setResumes(data);
    };
    fetchResumes();
  }, [jobs]);

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredJobs,
    clearFilters,
    activeFilterCount,
  } = useSearch(jobs);

  const currentWeekJobsCount = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return jobs.filter(job => new Date(job.createdAt) >= startOfWeek).length;
  }, [jobs]);

  useKeyboardShortcuts({
    onAdd: () => handleAddJob(),
    onSearch: () => document.querySelector('input[type="text"]')?.focus(),
    onToggleTheme: toggleTheme,
    onToggleDashboard: () => setView('dashboard'),
    onToggleBoard: () => setView('board'),
    onSave: () => {}, // Handled in form
  });

  const handleAddJob = () => {
    setEditingJob(null);
    setIsSlideOverOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsSlideOverOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    if (editingJob) {
      await updateJob(editingJob.id, jobData);
    } else {
      await addJob(jobData);
    }
    setIsSlideOverOpen(false);
  };

  const handleExport = async () => {
    await exportData();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          await importData(file);
          refresh();
          alert('Data imported successfully!');
        } catch (err) {
          alert('Failed to import data: ' + err.message);
        }
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans selection:bg-primary/20">
      <Header 
        view={view} 
        onViewToggle={setView} 
        onAddJob={handleAddJob}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onExport={handleExport}
        onImport={handleImport}
        onShowResumes={() => setIsResumeManagerOpen(true)}
        weeklyGoal={settings.weeklyGoal}
        currentWeekCount={currentWeekJobsCount}
      />
      
      {view === 'board' && (
        <div className="flex flex-col animate-in fade-in duration-500 overflow-hidden h-[calc(100vh-56px)]">
          <SearchBar 
            query={searchQuery}
            setQuery={setSearchQuery}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            onClear={clearFilters}
            activeCount={activeFilterCount}
            resultsCount={filteredJobs.length}
            totalCount={jobs.length}
          />
          <Board 
            jobs={filteredJobs} 
            onEditJob={handleEditJob}
            onStatusChange={(id, status) => updateJob(id, { status })}
          />
        </div>
      )}

      {view === 'dashboard' && <Dashboard jobs={jobs} />}

      <JobSlideOver 
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        onSave={handleSaveJob}
        job={editingJob}
      />

      <ResumeManager 
        isOpen={isResumeManagerOpen}
        onClose={() => setIsResumeManagerOpen(false)}
        resumes={resumes}
        onAdd={async (r) => { await resumesDb.put(r); refresh(); }}
        onDelete={async (name) => { await resumesDb.delete(name); refresh(); }}
      />

      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClear={clearFilters}
      />
    </div>
  );
}

export default App;
