import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Events APIs
export const eventsAPI = {
  getAll: async () => {
    const response = await api.get("/events");
    return response.data;
  },
  getByType: async (type) => {
    const response = await api.get(`/events?event_type=${type}`);
    return response.data;
  },
  getByPlatform: async (platform) => {
    const response = await api.get(`/events?platform=${platform}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/events", data);
    return response.data;
  },
  syncExternal: async () => {
    const response = await api.post("/events/sync-external");
    return response.data;
  },
};

// Registration APIs
export const registrationsAPI = {
  register: async (eventId) => {
    const response = await api.post("/registrations", { event_id: eventId });
    return response.data;
  },
  getMyRegistrations: async () => {
    const response = await api.get("/registrations/my-registrations");
    return response.data;
  },
};

// Stats APIs
export const statsAPI = {
  getClubStats: async () => {
    const response = await api.get("/stats");
    return response.data;
  },
};

export default api;
