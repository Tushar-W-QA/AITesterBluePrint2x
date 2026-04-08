import React from 'react';
import { FileText, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button, Badge } from '../UI/Button';
import { Modal } from '../UI/Modal';

export const ResumeManager = ({ resumes, onAdd, onDelete, isOpen, onClose }) => {
  const [newResumeName, setNewResumeName] = React.useState('');
  const [newResumeUrl, setNewResumeUrl] = React.useState('');

  const handleAdd = () => {
    if (newResumeName.trim()) {
      onAdd({ name: newResumeName.trim(), url: newResumeUrl.trim(), createdAt: new Date().toISOString(), usageCount: 0 });
      setNewResumeName('');
      setNewResumeUrl('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resume Manager" className="max-w-2xl">
      <div className="space-y-6">
        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Resume Name (e.g. SDE-Frontend-2024)"
              value={newResumeName}
              onChange={(e) => setNewResumeName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="url"
              placeholder="Drive/Dropbox Link (optional)"
              value={newResumeUrl}
              onChange={(e) => setNewResumeUrl(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button onClick={handleAdd} disabled={!newResumeName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {resumes.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No resumes saved yet</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <div key={resume.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{resume.name}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                      <span>Used in {resume.usageCount || 0} jobs</span>
                      {resume.url && (
                        <a href={resume.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          <ExternalLink className="w-3 h-3" />
                          Link
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(resume.name)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
