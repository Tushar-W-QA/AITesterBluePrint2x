import { 
  FileText, 
  Trophy, 
  LayoutGrid, 
  LayoutDashboard, 
  Sun, 
  Moon, 
  Download, 
  Plus 
} from 'lucide-react';
import { Button, Badge } from '../UI/Button';

export const Header = ({ onViewToggle, view, onAddJob, isDark, toggleTheme, onExport, onImport, onShowResumes, weeklyGoal = 5, currentWeekCount = 0 }) => {
  const goalProgress = Math.min((currentWeekCount / weeklyGoal) * 100, 100);

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight hidden lg:block">Job Assistant Buddy</h1>
        </div>
        
        <nav className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 ml-2">
           {/* ... existing nav buttons ... */}
          <button
            onClick={() => onViewToggle('board')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              view === 'board' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewToggle('dashboard')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              view === 'dashboard' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-4 border-l border-slate-200 dark:border-slate-800 pl-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weekly Goal</span>
              <span className="text-[10px] font-bold text-primary">{currentWeekCount}/{weeklyGoal}</span>
            </div>
            <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${goalProgress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
          {goalProgress === 100 && <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" onClick={onShowResumes} title="Resume Manager">
          <FileText className="w-5 h-5" />
        </Button>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
        <Button variant="ghost" size="icon" onClick={onExport} title="Export Data" className="hidden sm:flex">
          <Download className="w-5 h-5" />
        </Button>
        <Button onClick={onAddJob} className="ml-1 sm:ml-2 gap-2 h-9 px-3 sm:h-10 sm:px-4">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Job</span>
        </Button>
      </div>
    </header>
  );
};
