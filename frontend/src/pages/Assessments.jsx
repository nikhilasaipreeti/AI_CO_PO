import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon, MagnifyingGlassIcon, AcademicCapIcon,
  CalendarIcon, ClockIcon, CheckCircleIcon,
  ExclamationCircleIcon, XMarkIcon, ArrowPathIcon,
  DocumentTextIcon, ChartBarIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const Assessments = () => {
  const { isDarkMode } = useTheme();
  const [assessments, setAssessments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    courseId: '', name: '', type: 'formative', examCode: 'T1',
    date: '', totalMarks: 30, duration: 60,
    questionStructure: [
      { questionNumber: 1, marks: 10, description: 'Question 1' },
      { questionNumber: 2, marks: 10, description: 'Question 2' },
      { questionNumber: 3, marks: 10, description: 'Question 3' },
    ]
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes] = await Promise.all([api.get('/courses')]);
      const courseList = coursesRes.data.data || [];
      setCourses(courseList);

      // Fetch exams for all courses
      const examPromises = courseList.map(c => api.get(`/assessment/course/${c.id}`).catch(() => ({ data: { data: [] } })));
      const examResults = await Promise.all(examPromises);
      const allExams = examResults.flatMap((r, i) =>
        (r.data.data || []).map(e => ({
          ...e,
          courseName: courseList[i]?.name || 'Unknown',
          courseCode: courseList[i]?.code || '',
        }))
      );
      setAssessments(allExams);
    } catch (err) {
      toast.error('Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.courseId) return toast.error('Please select a course');
    if (!form.date) return toast.error('Please select exam date');
    setSubmitting(true);
    try {
      const res = await api.post('/assessment/exam', {
        ...form,
        courseId: parseInt(form.courseId),
        totalMarks: parseInt(form.totalMarks),
        duration: parseInt(form.duration),
      });
      const course = courses.find(c => c.id === parseInt(form.courseId));
      const newExam = {
        ...res.data.data,
        courseName: course?.name || '',
        courseCode: course?.code || '',
      };
      setAssessments(prev => [newExam, ...prev]);
      setShowModal(false);
      toast.success(`Assessment "${form.name}" created!`);
      setForm({ courseId: '', name: '', type: 'formative', examCode: 'T1', date: '', totalMarks: 30, duration: 60, questionStructure: [{ questionNumber: 1, marks: 10, description: 'Question 1' }, { questionNumber: 2, marks: 10, description: 'Question 2' }, { questionNumber: 3, marks: 10, description: 'Question 3' }] });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create assessment');
    } finally {
      setSubmitting(false);
    }
  };

  const addQuestion = () => {
    const n = form.questionStructure.length + 1;
    setForm(p => ({ ...p, questionStructure: [...p.questionStructure, { questionNumber: n, marks: 10, description: `Question ${n}` }] }));
  };

  const removeQuestion = (i) => {
    if (form.questionStructure.length <= 1) return;
    setForm(p => ({ ...p, questionStructure: p.questionStructure.filter((_, idx) => idx !== i) }));
  };

  const updateQuestion = (i, field, value) => {
    setForm(p => {
      const qs = [...p.questionStructure];
      qs[i] = { ...qs[i], [field]: field === 'marks' ? parseInt(value) || 0 : value };
      return { ...p, questionStructure: qs };
    });
  };

  const filtered = assessments
    .filter(a => a.name?.toLowerCase().includes(searchTerm.toLowerCase()) || a.courseName?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(a => filter === 'all' ? true : a.type === filter || a.status === filter);

  const statusColor = { completed: 'green', configured: 'blue', questions_mapped: 'purple', marks_entered: 'indigo', draft: 'gray', pending: 'yellow' };
  const card = `rounded-xl shadow-md transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`;
  const input = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Assessments</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage course examinations and evaluations</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
          <PlusIcon className="h-5 w-5 mr-2" /> New Assessment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: assessments.length, icon: DocumentTextIcon, color: 'blue' },
          { label: 'Completed', value: assessments.filter(a => a.status === 'completed').length, icon: CheckCircleIcon, color: 'green' },
          { label: 'Configured', value: assessments.filter(a => a.status === 'configured' || a.status === 'questions_mapped').length, icon: ChartBarIcon, color: 'purple' },
          { label: 'Draft', value: assessments.filter(a => a.status === 'draft').length, icon: ExclamationCircleIcon, color: 'orange' },
        ].map((s, i) => (
          <div key={i} className={`${card} p-4`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-${s.color}-100`}><s.icon className={`h-5 w-5 text-${s.color}-600`} /></div>
              <div className="ml-3">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={`${card} p-4`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search assessments..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} className={`${input} pl-10`} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className={input.replace('w-full', 'w-auto')}>
            <option value="all">All</option>
            <option value="formative">Formative</option>
            <option value="summative">Summative</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
          <button onClick={fetchData} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a, i) => {
            const sc = statusColor[a.status] || 'gray';
            return (
              <motion.div key={a.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={`${card} p-5 hover:shadow-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{a.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full bg-${sc}-100 text-${sc}-700 font-medium`}>{a.status}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{a.type}</span>
                      {a.examCode && <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">{a.examCode}</span>}
                    </div>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {a.courseCode} — {a.courseName}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { label: 'Date', value: a.date ? new Date(a.date).toLocaleDateString('en-IN') : '—', icon: CalendarIcon },
                        { label: 'Duration', value: `${a.duration || 60} mins`, icon: ClockIcon },
                        { label: 'Total Marks', value: a.totalMarks || 30 },
                        { label: 'Questions', value: a.questionStructure?.length || 0 },
                        { label: 'Created', value: a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : '—' },
                      ].map((d, j) => (
                        <div key={j}>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{d.label}</p>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      View
                    </button>
                    <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                      Map COs
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No assessments found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Create your first assessment to get started</p>
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white flex justify-between items-center flex-shrink-0">
                <h3 className="text-lg font-semibold">Create New Assessment</h3>
                <button onClick={() => setShowModal(false)}><XMarkIcon className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Course *</label>
                    <select value={form.courseId} onChange={e => setForm(p => ({ ...p, courseId: e.target.value }))} className={input} required>
                      <option value="">Select Course</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exam Code *</label>
                    <select value={form.examCode} onChange={e => setForm(p => ({ ...p, examCode: e.target.value, name: e.target.value }))} className={input}>
                      {['T1','T2','T3','T4','T5','MID','FINAL'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Assessment Name *</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. T1 Examination" className={input} required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className={input}>
                      <option value="formative">Formative</option>
                      <option value="summative">Summative</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Marks</label>
                    <input type="number" value={form.totalMarks} onChange={e => setForm(p => ({ ...p, totalMarks: +e.target.value }))} className={input} min="1" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duration (mins)</label>
                    <input type="number" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: +e.target.value }))} className={input} min="1" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={input} required />
                </div>

                {/* Questions */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Questions</label>
                    <button type="button" onClick={addQuestion}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                      + Add Question
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {form.questionStructure.map((q, i) => (
                      <div key={i} className={`flex gap-2 items-center p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <span className={`text-xs font-medium w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Q{i+1}</span>
                        <input value={q.description} onChange={e => updateQuestion(i, 'description', e.target.value)}
                          placeholder="Question description" className={`${input} flex-1`} />
                        <input type="number" value={q.marks} onChange={e => updateQuestion(i, 'marks', e.target.value)}
                          className={`${input} w-16`} min="1" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>marks</span>
                        <button type="button" onClick={() => removeQuestion(i)} className="text-red-400 hover:text-red-600">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Total: {form.questionStructure.reduce((s, q) => s + (q.marks || 0), 0)} marks
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className={`flex-1 py-2.5 border rounded-lg text-sm font-medium ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting ? <><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />Creating...</> : 'Create Assessment'}
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

export default Assessments;
