import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Category {
  _id: string;
  name: string;
  courses: number;
}

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Kategoriler alınamadı');
      
      const data = await response.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="w-64 bg-white shadow-lg p-4">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Kategoriler</h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              className={`block px-4 py-2 rounded-md ${
                location.pathname === `/category/${category._id}`
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">
                  {category.courses} ders
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {user?.role === 'admin' && (
        <div className="border-t p-4">
          <Link
            to="/admin"
            className={`block px-4 py-2 rounded-md ${
              location.pathname === '/admin'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Admin Paneli
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 