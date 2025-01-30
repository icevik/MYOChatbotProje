import axios from 'axios';
import { AuthResponse, Course, Conversation } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Token'ı her istekte otomatik ekle
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const token = JSON.parse(user).token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Auth servisleri
export const authAPI = {
    googleLogin: (idToken: string) => 
        api.post<AuthResponse>('/auth/google', { idToken })
};

// Ders servisleri
export const courseAPI = {
    getAll: () => 
        api.get<Course[]>('/courses'),
    
    getByCategory: (category: string) => 
        api.get<Course[]>(`/courses/category/${category}`),
    
    create: (data: Partial<Course>) => 
        api.post<Course>('/courses', data),
    
    update: (id: string, data: Partial<Course>) => 
        api.patch<Course>(`/courses/${id}`, data),
    
    delete: (id: string) => 
        api.delete<Course>(`/courses/${id}`)
};

// Konuşma servisleri
export const conversationAPI = {
    sendMessage: (courseId: string, message: string) => 
        api.post<Conversation>('/conversations/message', { courseId, message }),
    
    getUserConversations: () => 
        api.get<Conversation[]>('/conversations'),
    
    getConversationById: (id: string) => 
        api.get<Conversation>(`/conversations/${id}`)
}; 