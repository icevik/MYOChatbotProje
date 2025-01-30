export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    banned: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Course {
    _id: string;
    name: string;
    category: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface Conversation {
    _id: string;
    userId: string;
    courseId: Course;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
} 