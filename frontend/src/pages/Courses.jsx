import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon, PlusIcon, AcademicCapIcon,
  ClockIcon, CheckCircleIcon, ExclamationCircleIcon,
  XMarkIcon, ArrowPathIcon
} from '@heroicons/react/24/outline';
import CourseCard from '../components/Course/CourseCard';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const COLORS = ['blue', 'purple', 'green', 'yellow', 'indigo', 'pink', 'teal', 'orange'];

const Courses = () => {
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    code: '', name: '', department: 'Computer Science',
    semester: 1, credits: 4, syllabus: '', faculty: 'Dr. John Smith', students: 60
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/courses');
      const raw = res.data.data || [];
      // Enrich with display fields
      const enriched = raw.map((c, i) => ({
        ...c,
        faculty: c.faculty || 'Dr. John Smith',
        students: c.students || 60,
        cos: c.cos || 0,
        attainment: c.attainment || 0,
        progress: c.progress || (c.status === 'active' ? 60 : c.status === 'completed' ? 100 : 20),
        color: COLORS[i % COLORS.length]
      }));
      setCourses(enriched);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.code || !form.name) return toast.error('Course code and name are required');
    setSubmitting(true);
    try {
      const res = await api.post('/courses', form);
      const newCourse = {
        ...res.data.data,
        faculty: form.faculty,
        students: form.students,
        cos: 0, attainment: 0, progress: 10,
        color: COLORS[courses.length % COLORS.length]
      };
      setCourses(prev => [newCourse, ...prev]);
      setShowModal(false);
      setForm({ code: '', name: '', department: 'Computer Science', semester: 1, credits: 4, syllabus: '', faculty: 'Dr. John Smith', students: 60 });
      toast.success(`Course ${form.code} created successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Delete course ${code}?`)) return;
    try {
      await api.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
      toast.success(`Course ${code} deleted`);
    } catch {
      toast.error('Failed to delete course');
    }
  };

  const filtered = courses
    .filter(c => c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.code?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(c => filter === 'all' ? true : c.status === filter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name?.localeCompare(b.name);
      if (sortBy === 'progress') return (b.progress || 0) - (a.progress || 0);
      return (b.id || 0) - (a.id || 0);
    });

  const card = `rounded-xl shadow-md p-4 transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`;
  const input = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'}`;
  const select = `px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Courses</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage and track all your courses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> New Course
        </button>
      </div>

      {/* Filters */}
      <div className={card}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search courses by name or code..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} className={`${input} pl-10`} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className={select}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={select}>
            <option value="recent">Most Recent</option>
            <option value="name">Course Name</option>
            <option value="progress">Progress</option>
          </select>
          <button onClick={fetchCourses} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`} title="Refresh">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: courses.length, icon: AcademicCapIcon, color: 'blue' },
          { label: 'Active', value: courses.filter(c => c.status === 'active').length, icon: CheckCircleIcon, color: 'green' },
          { label: 'In Progress', value: courses.filter(c => c.status === 'in-progress').length, icon: ClockIcon, color: 'purple' },
          { label: 'Pending', value: courses.filter(c => c.status === 'pending' || c.status === 'draft').length, icon: ExclamationCircleIcon, color: 'orange' },
        ].map((s, i) => (
          <div key={i} className={card}>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${s.color}-100`}>
                <s.icon className={`h-6 w-6 text-${s.color}-600`} />
              </div>
              <div className="ml-3">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CourseCard course={course} onDelete={handleDelete} />
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No courses found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Try adjusting your search or create a new course</p>
        </div>
      )}

      {/* Create Course Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white flex justify-between items-center">
                <h3 className="text-lg font-semibold">Create New Course</h3>
                <button onClick={() => setShowModal(false)}><XMarkIcon className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Course Code *</label>
                    <input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                      placeholder="e.g. CS101" className={input} required />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Credits *</label>
                    <select value={form.credits} onChange={e => setForm(p => ({ ...p, credits: +e.target.value }))} className={input}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Course Name *</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Introduction to Programming" className={input} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department</label>
                    <input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className={input} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Semester</label>
                    <select value={form.semester} onChange={e => setForm(p => ({ ...p, semester: +e.target.value }))} className={input}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Syllabus (optional)</label>
                  <textarea value={form.syllabus} onChange={e => setForm(p => ({ ...p, syllabus: e.target.value }))}
                    rows={3} placeholder="Brief course description or syllabus..." className={input} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className={`flex-1 py-2.5 border rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting ? <><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />Creating...</> : 'Create Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
