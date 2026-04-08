import React, { useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/Header/SearchBar';
import Board from './components/Board/Board';
import Dashboard from './components/Dashboard/Dashboard';
import JobSlideOver from './components/Forms/JobSlideOver';
import ResumeManagerModal from './components/Forms/ResumeManagerModal';
import { useJobs } from './hooks/useJobs';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { jobs, loading, addJob, updateJob, updateJobStatus } = useJobs();
  const { searchTerm, setSearchTerm, filters, setFilters, filteredJobs, resetFilters, activeFilterCount } = useSearch(jobs);
  
  const [currentView, setCurrentView] = useState('board');
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [resumeManagerOpen, setResumeManagerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [defaultColumn, setDefaultColumn] = useState('wishlist');

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      
      if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSelectedJob(null);
        setDefaultColumn('wishlist');
        setSlideOverOpen(true);
      }
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleTheme();
      }
      if (e.key === '/') {
        e.preventDefault();
        document.querySelector('input[placeholder*="Search"]')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  const handleAddJobClick = (colId = 'wishlist') => {
    setSelectedJob(null);
    setDefaultColumn(colId);
    setSlideOverOpen(true);
  };

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setSlideOverOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    if (selectedJob) {
       await updateJob({ ...selectedJob, ...jobData });
    } else {
       await addJob({ ...jobData, status: jobData.status || defaultColumn });
    }
    setSlideOverOpen(false);
  };

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#F8F7F4] dark:bg-[#111110] text-gray-500">Loading your board...</div>
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F7F4] dark:bg-[#111110] text-gray-900 dark:text-gray-100 transition-colors">
      <Header 
         theme={theme} 
         toggleTheme={toggleTheme} 
         onAddJob={() => handleAddJobClick('wishlist')} 
         onOpenResumes={() => setResumeManagerOpen(true)}
         currentView={currentView}
         setCurrentView={setCurrentView}
         jobs={jobs}
      />
      
      {currentView === 'board' && (
         <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filters={filters} 
            setFilters={setFilters} 
            resetFilters={resetFilters} 
            activeFilterCount={activeFilterCount}
            totalFiltered={filteredJobs.length}
            totalJobs={jobs.length}
         />
      )}

      <main className="flex-1 relative overflow-hidden flex">
         {currentView === 'board' ? (
            <Board 
              jobs={filteredJobs} 
              onJobUpdateStatus={updateJobStatus} 
              onAddJob={handleAddJobClick}
              onCardClick={handleCardClick}
            />
         ) : (
            <Dashboard jobs={jobs} />
         )}
      </main>
      
      <JobSlideOver 
        isOpen={slideOverOpen} 
        onClose={() => setSlideOverOpen(false)} 
        job={selectedJob} 
        defaultColumn={defaultColumn}
        onSave={handleSaveJob}
      />
      
      <ResumeManagerModal 
         isOpen={resumeManagerOpen}
         onClose={() => setResumeManagerOpen(false)}
         jobs={jobs}
      />
    </div>
  );
}

export default App;
