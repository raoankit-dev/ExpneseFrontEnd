const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://expenseback-ciwj.onrender.com/api/v1';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('expense_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = body?.detail;
    const message = Array.isArray(detail) ? detail.map((item) => item.msg).join(', ') : detail;
    throw new Error(message || body?.message || 'Something went wrong. Please try again.');
  }
  return body;
}

export const api = {
  register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => apiRequest('/auth/me'),
  expenses: () => apiRequest('/expenses'),
  createExpense: (payload) => apiRequest('/expenses', { method: 'POST', body: JSON.stringify(payload) }),
  updateExpense: (id, payload) => apiRequest(`/expenses/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteExpense: (id) => apiRequest(`/expenses/${id}`, { method: 'DELETE' }),
  analyze: () => apiRequest('/ai/analyze'),
  chat: (question) => apiRequest('/ai/chat', { method: 'POST', body: JSON.stringify({ question }) }),
};

export const saveSession = (payload) => {
  localStorage.setItem('expense_token', payload.access_token);
};

export const clearSession = () => localStorage.removeItem('expense_token');
