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
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dersler</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/course/${course._id}`}
            className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600">{course.description}</p>
              <div className="mt-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {courses.length === 0 && !error && (
          <div className="col-span-full text-center text-gray-500">
            Bu kategoride henüz ders bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 