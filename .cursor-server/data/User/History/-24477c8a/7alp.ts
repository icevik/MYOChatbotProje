export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    banned?: boolean;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Course {
    _id: string;
    name: string;
    category: string;
    description?: string;
    hostAddress: string;
    chatbotId: string;
    securityKey: string;
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