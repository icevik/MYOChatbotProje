import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';
import ChatInput from '../components/Chat/ChatInput';

interface Course {
  _id: string;
  name: string;
  description: string;
  category: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchMessages();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Ders bilgileri alınamadı');
      
      const data = await response.json();
      setCourse(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/conversations/course/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Mesajlar alınamadı');
      
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/conversations/${courseId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) throw new Error('Mesaj gönderilemedi');
      
      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {course && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{course.name}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded mt-2">
            {course.category}
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <ChatWindow messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CoursePage; 