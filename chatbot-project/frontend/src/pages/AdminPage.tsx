import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
  studentId?: string;
  status: string;
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Bekleyen kullanıcıları al
      const pendingResponse = await fetch('/api/auth/pending-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!pendingResponse.ok) throw new Error('Bekleyen kullanıcılar alınamadı');
      const pendingData = await pendingResponse.json();
      setPendingUsers(pendingData);

      // Tüm kullanıcıları al
      const allResponse = await fetch('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!allResponse.ok) throw new Error('Kullanıcılar alınamadı');
      const allData = await allResponse.json();
      setAllUsers(allData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (userId: string, newStatus: 'active' | 'banned') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Durum güncellenemedi');

      // Kullanıcı listesini güncelle
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Paneli</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`${
                activeTab === 'pending'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
              onClick={() => setActiveTab('pending')}
            >
              Bekleyen İstekler ({pendingUsers.length})
            </button>
            <button
              className={`${
                activeTab === 'all'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('all')}
            >
              Tüm Kullanıcılar ({allUsers.length})
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ad Soyad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-posta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bölüm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Öğrenci No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === 'pending' ? pendingUsers : allUsers).map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.department || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.studentId || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status === 'active'
                      ? 'Aktif'
                      : user.status === 'pending'
                      ? 'Bekliyor'
                      : 'Engelli'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(user.id, 'active')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(user.id, 'banned')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reddet
                      </button>
                    </>
                  )}
                  {user.status === 'active' && (
                    <button
                      onClick={() => handleStatusUpdate(user.id, 'banned')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Engelle
                    </button>
                  )}
                  {user.status === 'banned' && (
                    <button
                      onClick={() => handleStatusUpdate(user.id, 'active')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Engeli Kaldır
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage; 