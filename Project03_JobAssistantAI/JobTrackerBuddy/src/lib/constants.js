export const COLUMNS = [
  { id: 'wishlist', label: 'Wishlist', icon: '⭐️', color: '#6366F1' },
  { id: 'applied', label: 'Applied', icon: '📤', color: '#3B82F6' },
  { id: 'screening', label: 'Screening', icon: '📞', color: '#F59E0B' },
  { id: 'interview', label: 'Interview', icon: '🎯', color: '#8B5CF6' },
  { id: 'offer', label: 'Offer', icon: '🎉', color: '#10B981' },
  { id: 'accepted', label: 'Accepted', icon: '✅', color: '#22C55E' },
  { id: 'rejected', label: 'Rejected', icon: '❌', color: '#EF4444' },
  { id: 'withdrawn', label: 'Withdrawn', icon: '⏸️', color: '#6B7280' },
];

export const STATUS_COLORS = COLUMNS.reduce((acc, col) => {
  acc[col.id] = col.color;
  return acc;
}, {});

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
export const WORK_MODES = ['Remote', 'Hybrid', 'On-site'];
export const PRIORITIES = ['High', 'Medium', 'Low'];
