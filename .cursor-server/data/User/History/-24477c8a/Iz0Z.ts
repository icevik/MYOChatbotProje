export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    user: User;
}

export interface Course {
    _id: string;
    name: string;
    category: string;
    hostAddress: string;
    chatbotId: string;
    securityKey: string;
    description?: string;
    isActive: boolean;
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface Conversation {
    _id: string;
    userId: string;
    courseId: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
} 