export const STATUS = {
  WISHLIST: 'wishlist',
  APPLIED: 'applied',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
};

export const COLUMNS = [
  { id: STATUS.WISHLIST, label: 'Wishlist', color: '#6366F1', description: 'Jobs saved to apply later' },
  { id: STATUS.APPLIED, label: 'Applied', color: '#3B82F6', description: 'Application submitted' },
  { id: STATUS.SCREENING, label: 'Screening', color: '#F59E0B', description: 'Phone/HR screen scheduled or done' },
  { id: STATUS.INTERVIEW, label: 'Interview', color: '#8B5CF6', description: 'Technical or panel rounds ongoing' },
  { id: STATUS.OFFER, label: 'Offer', color: '#10B981', description: 'Offer received' },
  { id: STATUS.ACCEPTED, label: 'Accepted', color: '#22C55E', description: 'Offer accepted — you got the job' },
  { id: STATUS.REJECTED, label: 'Rejected', color: '#EF4444', description: 'Application rejected' },
  { id: STATUS.WITHDRAWN, label: 'Withdrawn', color: '#6B7280', description: 'You withdrew the application' },
];

export const PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const PRIORITY_COLORS = {
  [PRIORITY.HIGH]: '#EF4444',
  [PRIORITY.MEDIUM]: '#F59E0B',
  [PRIORITY.LOW]: '#10B981',
};

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export const WORK_MODES = ['Remote', 'Hybrid', 'On-site'];

export const DB_NAME = 'JobAssistantBuddyDB';
export const DB_VERSION = 1;

export const STORES = {
  JOBS: 'jobs',
  RESUMES: 'resumes',
  SETTINGS: 'settings',
  ACTIVITY_LOG: 'activityLog',
};
