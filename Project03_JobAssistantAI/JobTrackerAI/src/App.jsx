import React, { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Board } from './components/kanban/Board';
import { JobModal } from './features/jobs/JobModal';
import { useJobStore } from './store/jobStore';
import { Plus, Search } from 'lucide-react';

function App() {
  const { loadJobs, isLoading, error } = useJobStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJobToEdit(null);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center dark:bg-gray-950 text-gray-500">Loading your jobs...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">Error loading jobs: {error}</div>;
  }

  return (
    <Layout>
      <header className="bg-white dark:bg-gray-950 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Jobs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your job applications</p>
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search jobs or companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            <span>Add Job</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden relative">
        <Board onEditJob={handleEditJob} searchQuery={searchQuery} />
      </div>

      <JobModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        jobToEdit={jobToEdit} 
      />
    </Layout>
  );
}

export default App;
