import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { COLUMNS } from '../../components/kanban/Board';

export const JobModal = ({ isOpen, onClose, jobToEdit }) => {
  const { addJob, updateJob } = useJobStore();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'wishlist',
    linkedinUrl: '',
    resumeUsed: '',
    dateApplied: new Date().toISOString().split('T')[0],
    salaryRange: '',
    location: '',
    jobType: 'Full-time',
    notes: '',
    priority: 'Medium',
    tags: []
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({ ...formData, ...jobToEdit, dateApplied: jobToEdit.dateApplied ? new Date(jobToEdit.dateApplied).toISOString().split('T')[0] : '' });
    } else {
      setFormData({
        companyName: '',
        jobTitle: '',
        status: 'wishlist',
        linkedinUrl: '',
        resumeUsed: '',
        dateApplied: new Date().toISOString().split('T')[0],
        salaryRange: '',
        location: '',
        jobType: 'Full-time',
        notes: '',
        priority: 'Medium',
        tags: []
      });
    }
  }, [jobToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jobToEdit) {
        await updateJob(jobToEdit.id, formData);
      } else {
        await addJob(formData);
      }
      onClose();
    } catch (error) {
      alert("Error saving job");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {jobToEdit ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
              <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title *</label>
              <input required type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {COLUMNS.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Applied</label>
              <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary Range</label>
              <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="e.g. $100k - $120k" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote, NY" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume Used</label>
              <input type="text" name="resumeUsed" value={formData.resumeUsed} onChange={handleChange} placeholder="e.g. Software Engineer V2" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors">
              {jobToEdit ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
