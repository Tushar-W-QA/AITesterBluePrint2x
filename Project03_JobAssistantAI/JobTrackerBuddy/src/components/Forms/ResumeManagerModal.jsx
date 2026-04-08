import React, { useState } from 'react';
import { X, Trash2, ExternalLink, Plus } from 'lucide-react';
import { useResumes } from '../../hooks/useResumes';

export default function ResumeManagerModal({ isOpen, onClose, jobs }) {
  const { resumes, addResume, deleteResume } = useResumes();
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  if (!isOpen) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName) return;
    await addResume(newName, newUrl);
    setNewName('');
    setNewUrl('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1C1C1A] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold dark:text-white">Resume Manager</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
             <X size={20} />
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
           {resumes.length === 0 && <p className="text-gray-500 text-center py-4">No resumes tracked yet.</p>}
           <ul className="space-y-3">
             {resumes.map(r => {
               const usage = jobs?.filter(j => j.resume === r.name).length || 0;
               return (
                 <li key={r.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111110] rounded-lg border border-gray-200 dark:border-gray-800">
                   <div>
                     <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">{r.name}</div>
                     <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Used in {usage} applications</div>
                   </div>
                   <div className="flex items-center gap-1">
                     {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"><ExternalLink size={16}/></a>}
                     <button onClick={() => deleteResume(r.name)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"><Trash2 size={16}/></button>
                   </div>
                 </li>
               )
             })}
           </ul>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#151515]">
           <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <div className="flex gap-2">
                  <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Resume Name (e.g. Frontend v2)" className="flex-1 px-3 py-1.5 text-sm rounded-md bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 outline-none focus:ring-1 focus:ring-blue-500" required />
                  <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Drive PDF URL (Optional)" className="flex-1 px-3 py-1.5 text-sm rounded-md bg-white dark:bg-[#1C1C1A] border border-gray-300 dark:border-gray-700 outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={!newName} className="bg-[#1D4ED8] text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-1.5"><Plus size={16}/> Add</button>
           </form>
        </div>
      </div>
    </div>
  )
}
