
const KEY = "chat_sessions";

export const loadSessions = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const saveSessions = (sessions) =>
  localStorage.setItem(KEY, JSON.stringify(sessions));
