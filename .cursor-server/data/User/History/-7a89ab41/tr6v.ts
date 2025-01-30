import axios from 'axios';
import { AuthResponse, Course, Conversation } from '../types';
import { auth } from '../config/firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Her istekte Firebase token'ını ekle
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth servisleri
export const authAPI = {
    auth0Login: (token: string) => {
        return api.post<AuthResponse>('/auth/auth0', { token });
    }
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

export default api; 