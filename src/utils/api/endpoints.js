/**
 * Centralized API Endpoints registry
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    ACTIVITIES: '/dashboard/recent-activity',
    CHARTS: '/dashboard/analytics',
  },
  CHAT: {
    CONVERSATIONS: '/chat/conversations',
    MESSAGES: (chatId) => `/chat/${chatId}/messages`,
    SEND_MESSAGE: (chatId) => `/chat/${chatId}/messages`,
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
};
