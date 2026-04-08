export function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
}

export function daysSince(dateString) {
  if (!dateString) return null;
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - targetDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function combineClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}
