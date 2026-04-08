import React, { useState, useEffect } from 'react';
import { SlideOver } from '../UI/Modal';
import { Button } from '../UI/Button';
import { JobForm } from './JobForm';

export const JobSlideOver = ({ isOpen, onClose, onSave, job }) => {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        status: 'wishlist',
        priority: 'Medium',
        rating: 0,
        tags: [],
        dateApplied: new Date().toISOString().split('T')[0],
      });
    }
    setActiveTab('Overview');
  }, [job, isOpen]);

  const handleSubmit = async (e, shouldClose = true) => {
    e?.preventDefault();
    if (!formData.company || !formData.role) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      if (shouldClose) {
        onClose();
      } else {
        // Reset for "Save & Add Another"
        setFormData({
          status: 'wishlist',
          priority: 'Medium',
          rating: 0,
          tags: [],
          dateApplied: new Date().toISOString().split('T')[0],
        });
        setActiveTab('Overview');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
      {!job && (
        <Button 
          variant="secondary" 
          onClick={() => handleSubmit(null, false)} 
          disabled={isSubmitting || !formData.company || !formData.role}
        >
          Save & Add Another
        </Button>
      )}
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting || !formData.company || !formData.role}
      >
        {isSubmitting ? 'Saving...' : job ? 'Update Job' : 'Add Job'}
      </Button>
    </div>
  );

  return (
    <SlideOver 
      isOpen={isOpen} 
      onClose={onClose} 
      title={job ? 'Edit Job' : 'Add New Job'}
      footer={footer}
    >
      <div className="flex flex-col gap-6">
        <div className="flex border-b border-slate-100 dark:border-slate-800 -mx-6 px-6">
          {['Overview', 'Contact', 'Interview', 'Notes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-[2px] ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <JobForm 
          activeTab={activeTab} 
          formData={formData} 
          setFormData={setFormData}
          job={job}
        />
      </div>
    </SlideOver>
  );
};
