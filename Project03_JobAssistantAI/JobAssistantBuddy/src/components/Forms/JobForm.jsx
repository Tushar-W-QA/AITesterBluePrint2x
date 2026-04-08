import React from 'react';
import { TagInput } from './TagInput';
import { STATUS, PRIORITY, JOB_TYPES, WORK_MODES } from '../../lib/constants';
import { Star } from 'lucide-react';

export const JobForm = ({ activeTab, formData, setFormData, job }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company || ''}
            onChange={handleChange}
            placeholder="e.g. Google, Stripe, Meta"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Role *</label>
          <input
            type="text"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
          <select
            name="status"
            value={formData.status || 'wishlist'}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          >
            {Object.values(STATUS).map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority || 'Medium'}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          >
            {Object.values(PRIORITY).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date Applied</label>
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Follow-up Date</label>
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="e.g. Remote, NYC"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary || ''}
            onChange={handleChange}
            placeholder="e.g. $150k - $180k"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Personal Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star 
                className={`w-6 h-6 ${star <= (formData.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tags</label>
        <TagInput 
          tags={formData.tags || []} 
          setTags={(tags) => setFormData(prev => ({ ...prev, tags }))} 
        />
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contact Name</label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName || ''}
          onChange={handleChange}
          placeholder="Recruiter or Hiring Manager"
          className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail || ''}
          onChange={handleChange}
          placeholder="email@company.com"
          className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">LinkedIn URL</label>
        <input
          type="url"
          name="linkedinUrl"
          value={formData.linkedinUrl || ''}
          onChange={handleChange}
          placeholder="https://linkedin.com/jobs/..."
          className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Job Posting URL</label>
        <input
          type="url"
          name="jobPostingUrl"
          value={formData.jobPostingUrl || ''}
          onChange={handleChange}
          placeholder="https://company.com/careers/..."
          className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );

  const renderInterview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Total Rounds</label>
          <input
            type="number"
            name="interviewRounds"
            value={formData.interviewRounds || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Current Round</label>
          <input
            type="number"
            name="currentRound"
            value={formData.currentRound || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {formData.status === 'rejection' || formData.status === 'rejected' && (
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Rejection Reason</label>
          <textarea
            name="rejectionReason"
            value={formData.rejectionReason || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 h-24"
          />
        </div>
      )}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Notes</label>
      <textarea
        name="notes"
        value={formData.notes || ''}
        onChange={handleChange}
        placeholder="Add details about the role, interview experience, or company research..."
        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 h-64 resize-none"
      />
    </div>
  );

  switch (activeTab) {
    case 'Contact': return renderContact();
    case 'Interview': return renderInterview();
    case 'Notes': return renderNotes();
    default: return renderOverview();
  }
};
