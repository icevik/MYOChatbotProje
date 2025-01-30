import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Conversation {
  _id: string;
  courseId: {
    name: string;
    category: string;
  };
  messages: {
    role: string;
    content: string;
    timestamp: string;
  }[];
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/conversations/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Konuşma geçmişi alınamadı');
      
      const data = await response.json();
      setConversations(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profil Bilgileri */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Profil Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Ad Soyad</label>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">E-posta</label>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Bölüm</label>
                <p className="font-medium">{user?.department || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Öğrenci No</label>
                <p className="font-medium">{user?.studentId || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Hesap Durumu</label>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user?.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : user?.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user?.status === 'active'
                    ? 'Aktif'
                    : user?.status === 'pending'
                    ? 'Onay Bekliyor'
                    : 'Engelli'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Konuşma Geçmişi */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Konuşma Geçmişi</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {conversations.length === 0 ? (
              <p className="text-gray-500">Henüz bir konuşma geçmişiniz bulunmuyor.</p>
            ) : (
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{conversation.courseId.name}</h3>
                        <p className="text-sm text-gray-500">{conversation.courseId.category}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(conversation.createdAt)}
                      </span>
                    </div>
                    
                    {activeConversation?._id === conversation._id && (
                      <div className="mt-4 space-y-2">
                        {conversation.messages.map((message, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-blue-100 ml-auto'
                                : 'bg-gray-100'
                            } max-w-[80%]`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-gray-500">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 