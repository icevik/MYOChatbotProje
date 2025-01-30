import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Course {
  _id: string;
  name: string;
  description: string;
  category: string;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [categoryId]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/categories/${categoryId}/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Dersler alınamadı');
      
      const data = await response.json();
      setCourses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/course/${course._id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {course.description}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Bu kategoride henüz ders bulunmuyor.
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 