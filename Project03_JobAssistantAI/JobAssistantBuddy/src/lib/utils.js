import { formatDistanceToNow, format } from 'date-fns';

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const daysSince = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return '';
  return format(new Date(dateString), formatStr);
};

export const getDaysDiff = (dateString) => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDateColor = (dateString) => {
  const diffDays = getDaysDiff(dateString);
  if (diffDays < 7) return 'text-green-600 dark:text-green-400';
  if (diffDays <= 30) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
