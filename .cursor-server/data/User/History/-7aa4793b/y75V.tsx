import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';
import ChatInput from '../components/Chat/ChatInput';

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  category: string;
}

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
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
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
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
      setMessages(prev => [...prev, 
        { role: 'user', content, timestamp: new Date().toISOString() },
        { role: 'assistant', content: data.response, timestamp: new Date().toISOString() }
      ]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!course) {
    return <div>Ders bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h1>
        <p className="text-gray-600">{course.description}</p>
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded mt-2">
          {course.category}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ChatWindow messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default CoursePage; 