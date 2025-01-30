export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    department?: string;
    studentId?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Course {
    id: string;
    name: string;
    category: string;
    description?: string;
    hostAddress: string;
    chatbotId: string;
    securityKey: string;
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
    id: string;
    userId: string;
    courseId: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
} 