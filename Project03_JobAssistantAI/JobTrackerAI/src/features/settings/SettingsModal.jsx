import React, { useRef } from 'react';
import { X, Download, Upload, Trash } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { jobs, clearAllJobs } = useJobStore();
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `jobtracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      try {
        const importedJobs = JSON.parse(e.target.result);
        if (Array.isArray(importedJobs)) {
           // Basic validation
           const isValid = importedJobs.every(job => job.id && job.companyName && job.jobTitle && job.status);
           if (!isValid) throw new Error("Invalid format");
           
           if(confirm(`This will import ${importedJobs.length} jobs. Continue?`)) {
              // we will clear and write, or just add
              // using a loop for simplicity, normally we'd write a batch upload to IDB
              for(const job of importedJobs) {
                 useJobStore.getState().addJob(job);
              }
              alert("Import successful");
           }
        }
      } catch (err) {
        alert("Failed to parse JSON file or invalid schema.");
      }
    };
  };

  const handleClearAll = async () => {
    if (confirm("Are you ABSOLUTELY sure you want to delete all jobs? This cannot be undone!")) {
      await clearAllJobs();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Backup & Restore</h3>
            <div className="space-y-3">
              <button onClick={handleExport} className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-md transition-colors">
                <Download size={18} />
                <span>Export Data (JSON)</span>
              </button>
              
              <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 rounded-md transition-colors">
                <Upload size={18} />
                <span>Import Data (JSON)</span>
              </button>
              <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-red-500 uppercase tracking-wider mb-3">Danger Zone</h3>
            <button onClick={handleClearAll} className="w-full flex items-center justify-center space-x-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 py-2 rounded-md transition-colors">
              <Trash size={18} />
              <span>Delete All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
