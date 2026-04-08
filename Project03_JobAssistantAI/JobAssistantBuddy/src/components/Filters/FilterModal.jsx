import React from 'react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { PRIORITY, WORK_MODES, JOB_TYPES, STATUS } from '../../lib/constants';
import { X } from 'lucide-react';

export const FilterModal = ({ isOpen, onClose, filters, setFilters, onClear }) => {
  const handleChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: prev[name] === value ? '' : value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters" className="max-w-md">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(STATUS).map(s => (
              <button
                key={s}
                onClick={() => handleChange('status', s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.status === s 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Priority</label>
            <div className="flex flex-col gap-2">
              {Object.values(PRIORITY).map(p => (
                <button
                  key={p}
                  onClick={() => handleChange('priority', p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    filters.priority === p 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Work Mode</label>
            <div className="flex flex-col gap-2">
              {WORK_MODES.map(m => (
                <button
                  key={m}
                  onClick={() => handleChange('workMode', m)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    filters.workMode === m 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClear}>Reset all</Button>
          <Button onClick={onClose}>Apply Filters</Button>
        </div>
      </div>
    </Modal>
  );
};
