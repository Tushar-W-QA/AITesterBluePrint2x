import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { combineClasses } from '../../lib/utils';
import { COLUMNS } from '../../lib/constants';

export default function JobSlideOver({ isOpen, onClose, job, defaultColumn, onSave }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: defaultColumn || 'wishlist',
    location: '',
    workMode: '',
    priority: '',
    dateApplied: '',
    notes: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (job) {
        setFormData({ ...job });
      } else {
        setFormData({
          company: '',
          role: '',
          status: defaultColumn || 'wishlist',
          location: '',
          workMode: '',
          priority: '',
          dateApplied: new Date().toISOString().split('T')[0],
          notes: '',
        });
      }
    }
  }, [isOpen, job, defaultColumn]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return; // Validation
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-[#111110] border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form id="jobForm" onSubmit={handleSubmit} className="space-y-5">
            {/* required fields */}
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company *</label>
               <input 
                 autoFocus
                 required
                 name="company" 
                 value={formData.company || ''} 
                 onChange={handleChange} 
                 className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100" 
               />
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role *</label>
               <input 
                 required
                 name="role" 
                 value={formData.role || ''} 
                 onChange={handleChange} 
                 className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100" 
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                 <select 
                   name="status" 
                   value={formData.status || ''} 
                   onChange={handleChange} 
                   className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                 >
                    {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date Applied</label>
                 <input 
                    type="date"
                    name="dateApplied" 
                    value={(formData.dateApplied || '').split('T')[0]} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-transparent" 
                 />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                 <input 
                   name="location" 
                   value={formData.location || ''} 
                   onChange={handleChange} 
                   className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Work Mode</label>
                 <select 
                   name="workMode" 
                   value={formData.workMode || ''} 
                   onChange={handleChange} 
                   className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                 >
                    <option value="">Any</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                 </select>
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
                 <select 
                   name="priority" 
                   value={formData.priority || ''} 
                   onChange={handleChange} 
                   className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                 >
                    <option value="">None</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                 </select>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes</label>
               <textarea 
                 rows="4"
                 name="notes" 
                 value={formData.notes || ''} 
                 onChange={handleChange} 
                 className="w-full px-3 py-2 bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 resize-none" 
               />
            </div>
            
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#151515] flex justify-end gap-3">
           <button 
             type="button" 
             onClick={onClose}
             className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-300 dark:border-gray-700 flex items-center gap-1.5"
           >
             <X size={16}/> Cancel
           </button>
           <button 
             type="submit" 
             form="jobForm"
             disabled={!formData.company || !formData.role}
             className="px-4 py-2 font-medium bg-[#1D4ED8] text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-1.5"
           >
             <Check size={16}/> Save Job
           </button>
        </div>

      </div>
    </div>
  );
}
