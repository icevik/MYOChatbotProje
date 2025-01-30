import axios from 'axios';
import { AuthResponse, Course, Conversation } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Her istekte Firebase token'ını ekle
api.interceptors.request.use(async (config) => {
    try {
        const token = await window.getAccessToken();
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
    getProfile: () => api.get('/auth/profile'),
};

// Ders servisleri
export const courseAPI = {
    getCourses: () => api.get('/courses'),
    getCourse: (id: string) => api.get(`/courses/${id}`),
};

// Konuşma servisleri
export const conversationAPI = {
    getConversations: () => api.get('/conversations'),
    getConversation: (id: string) => api.get(`/conversations/${id}`),
    createMessage: (courseId: string, message: string) => 
        api.post(`/conversations/${courseId}`, { message }),
};

export default api; 