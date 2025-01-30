import axios from 'axios';
import { AuthResponse, Course, Conversation } from '../types';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Her istekte Firebase token'ını ekle
api.interceptors.request.use(async (config) => {
    try {
        const auth = useAuth();
        const token = await auth.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Auth servisleri
export const authAPI = {
    getProfile: () => api.get<AuthResponse>('/auth/profile'),
};

// Ders servisleri
export const courseAPI = {
    getAll: () => api.get<Course[]>('/courses'),
    getByCategory: (category: string) => api.get<Course[]>(`/courses/category/${category}`),
    getById: (id: string) => api.get<Course>(`/courses/${id}`),
};

// Konuşma servisleri
export const conversationAPI = {
    getAll: () => api.get<Conversation[]>('/conversations'),
    getById: (id: string) => api.get<Conversation>(`/conversations/${id}`),
    sendMessage: (courseId: string, message: string) => 
        api.post<Conversation>(`/conversations/${courseId}`, { message }),
};

export default api; 