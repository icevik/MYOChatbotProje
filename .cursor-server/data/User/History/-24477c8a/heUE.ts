export interface User {
    sub?: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    banned?: boolean;
}

export interface AuthResponse {
    user: User;
}

export interface Course {
    id: string;
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
    id: string;
    userId: string;
    courseId: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
} 