// Timezone utility for Zimbabwe (Africa/Harare, UTC+2)

const TIMEZONE = 'Africa/Harare';

// Convert UTC timestamp to local Zimbabwe time
export const toLocalTime = (utcDate, options = {}) => {
  if (!utcDate) return '';
  
  const defaultOptions = {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  return new Date(utcDate).toLocaleString('en-ZW', { ...defaultOptions, ...options });
};

// Get current date in Zimbabwe (YYYY-MM-DD format for filtering)
export const getLocalDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: TIMEZONE });
};

// Get current datetime in Zimbabwe for display
export const getLocalDateTime = () => {
  return toLocalTime(new Date(), {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format time only (for appointment slots)
export const formatTime = (utcDate) => {
  if (!utcDate) return '';
  return new Date(utcDate).toLocaleTimeString('en-ZW', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Convert local Zimbabwe date to UTC for database storage
export const toUTC = (localDate) => {
  const date = typeof localDate === 'string' ? new Date(localDate) : localDate;
  return date.toISOString();
};

export { TIMEZONE };