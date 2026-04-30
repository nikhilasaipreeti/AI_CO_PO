import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        code: 'CS101',
        name: 'Introduction to Programming',
        status: 'active',
        progress: 75,
        attainmentCalculated: false,
        mappingCompleted: true
      }
    ];
    setCourses(mockCourses);
    setLoading(false);
  }, []);

  return { courses, loading, error };
};
