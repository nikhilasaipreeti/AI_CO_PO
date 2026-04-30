import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async() => {
        try {
            setLoading(true);
            // Mock data
            const mockCourses = [{
                    id: 1,
                    code: 'CS101',
                    name: 'Introduction to Programming',
                    department: 'Computer Science',
                    semester: 1,
                    credits: 4,
                    status: 'active',
                    progress: 75,
                    faculty: 'Dr. John Smith',
                    students: 65,
                    cos: 4,
                    attainment: 72,
                    color: 'blue',
                    attainmentCalculated: false,
                    mappingCompleted: true
                },
                {
                    id: 2,
                    code: 'CS201',
                    name: 'Data Structures',
                    department: 'Computer Science',
                    semester: 3,
                    credits: 4,
                    status: 'in-progress',
                    progress: 45,
                    faculty: 'Dr. John Smith',
                    students: 58,
                    cos: 5,
                    attainment: 68,
                    color: 'purple',
                    attainmentCalculated: false,
                    mappingCompleted: false
                }
            ];
            setCourses(mockCourses);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    return {
        courses,
        loading,
        error,
        fetchCourses
    };
};