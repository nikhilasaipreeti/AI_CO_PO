import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BeakerIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  DocumentTextIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import vignanLogo from '../assets/images/vignan.jpeg';

const Home = () => {
  const features = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Course Outcome Generation",
      description: "Automatically generate 4-6 Course Outcomes aligned with Bloom's Taxonomy from your syllabus",
      color: "bg-amber-100 text-amber-700",
      border: "border-amber-200"
    },
    {
      icon: <BeakerIcon className="h-8 w-8" />,
      title: "CO-PO/PSO Mapping",
      description: "Intelligent mapping of Course Outcomes to Program Outcomes and Program Specific Outcomes",
      color: "bg-orange-100 text-orange-700",
      border: "border-orange-200"
    },
    {
      icon: <DocumentTextIcon className="h-8 w-8" />,
      title: "Question-CO Alignment",
      description: "Automatically map exam questions to appropriate COs and Bloom's Taxonomy levels",
      color: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-200"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Attainment Calculation",
      description: "Compute CO, PO, and PSO attainment levels based on student performance",
      color: "bg-amber-100 text-amber-700",
      border: "border-amber-200"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Student Performance Analytics",
      description: "Track individual and batch-wise student performance across all outcomes",
      color: "bg-orange-100 text-orange-700",
      border: "border-orange-200"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: "AI Chatbot Assistant",
      description: "24/7 intelligent assistant to help faculty with OBE processes and queries",
      color: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-200"
    }
  ];

  const stats = [
    { label: "Active Users", value: "500+", icon: UserGroupIcon },
    { label: "Courses Mapped", value: "1,200+", icon: AcademicCapIcon },
    { label: "COs Generated", value: "5,000+", icon: DocumentTextIcon },
    { label: "Reports Generated", value: "10,000+", icon: ChartBarIcon }
  ];

  const howItWorks = [
    { step: "01", title: "Upload Syllabus", description: "Upload your course syllabus and let AI analyze the content" },
    { step: "02", title: "Generate COs", description: "AI automatically generates Course Outcomes with Bloom's levels" },
    { step: "03", title: "Configure Exams", description: "Set up exam structures and upload question papers" },
    { step: "04", title: "Upload Marks", description: "Enter student marks manually or upload Excel sheets" },
    { step: "05", title: "Get Attainment", description: "Automatic CO-PO-PSO attainment calculation with visual reports" }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Professor, CSE Department",
      content: "This system has reduced our CO mapping time by 90%. The AI accuracy is remarkable!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Prof. Jivan Kumar",
      role: "Dean Academics",
      content: "The attainment reports are NBA-ready. Saved us weeks of manual work before accreditation.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Dr. Amit Patel",
      role: "HOD, Information Technology",
      content: "Best OBE automation tool I've used. The chatbot is incredibly helpful for faculty.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7c3a1e 0%, #a0522d 40%, #c8762a 100%)' }}>
        {/* Library background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3')" }}
        />
        <div className="absolute inset-0 bg-black opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          {/* Vignan badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-3 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-full px-5 py-2">
              <img src={vignanLogo} alt="Vignan" className="h-8 w-8 rounded-full object-cover border-2 border-yellow-300" />
              <span className="text-white font-semibold text-sm tracking-wide">VIGNAN'S UNIVERSITY — OBE Management System</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              AI-Powered CO-PO-PSO Mapping
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: '#fcd34d' }}>
              & Attainment Analytics System
            </p>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white opacity-90">
              Automating Outcome Based Education using Intelligent Course Outcome Generation,
              Assessment Mapping, and Attainment Analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
                style={{ color: '#7c3a1e' }}
              >
                Get Started Free
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white transition-all transform hover:scale-105"
                style={{ '--hover-color': '#7c3a1e' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#7c3a1e'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'white'; }}
              >
                Faculty Login
              </Link>
            </div>

            <p className="mt-6 text-sm text-white opacity-70">
              Join 500+ educational institutions already using our platform
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-full mb-4" style={{ background: '#fef3c7' }}>
                  <stat.icon className="h-6 w-6" style={{ color: '#92400e' }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: '#7c3a1e' }}>{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vignan-style Info Banner ── */}
      <section className="py-10" style={{ background: '#fdf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#7c3a1e' }}>
                Meaningful Impact For Better Education
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "LEARNING & ASSESSMENT", desc: "AI-powered CO generation, Bloom's classification, Question mapping" },
                  { label: "PROFESSIONAL TOOLS", desc: "NBA-ready reports, SAR generation, Excel/PDF export" },
                  { label: "RESEARCH & ANALYTICS", desc: "Attainment dashboards, trend analysis, batch comparisons" },
                  { label: "ACCREDITATION SUPPORT", desc: "CO-PO-PSO matrices, direct & indirect attainment tracking" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-100 shadow-sm">
                    <CheckCircleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#c8762a' }} />
                    <div>
                      <p className="text-xs font-bold tracking-wide" style={{ color: '#c8762a' }}>{item.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choose Vignan card — inspired by portal */}
            <div className="w-full md:w-72 rounded-xl shadow-lg p-6 text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3a1e, #a0522d)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#fcd34d' }}>Choose Vignan OBE</h3>
              <p className="text-sm text-white opacity-90 mb-4">
                With decades of academic excellence, Vignan's OBE system is trusted by faculty across departments for NBA accreditation and outcome-based learning.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-5 py-2.5 bg-white rounded-lg font-semibold text-sm transition-all hover:scale-105"
                style={{ color: '#7c3a1e' }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#7c3a1e' }}>
              Everything You Need for OBE Automation
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive tools to streamline your Outcome Based Education processes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-xl shadow-sm border-2 ${feature.border} overflow-hidden group cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #a0522d, #c8762a)' }} />
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#7c3a1e' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20" style={{ background: '#fdf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#7c3a1e' }}>
              How It Works
            </h2>
            <p className="text-lg text-gray-500">Simple 5-step process to transform your OBE workflow</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5" style={{ background: '#e8c9a0' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md"
                      style={{ background: 'linear-gradient(135deg, #7c3a1e, #c8762a)' }}>
                      {item.step}
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#7c3a1e' }}>{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#7c3a1e' }}>
              What Educators Say
            </h2>
            <p className="text-lg text-gray-500">Trusted by faculty across top institutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-5 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3 border-2 border-amber-200" />
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: '#7c3a1e' }}>{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #7c3a1e 0%, #a0522d 50%, #c8762a 100%)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your OBE Process?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of institutions already using our AI-powered system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                style={{ color: '#7c3a1e' }}
              >
                Start Free Trial
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <a
                href="mailto:support@vignan.ac.in"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white transition-all"
                onMouseEnter={e => { e.currentTarget.style.color = '#7c3a1e'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'white'; }}
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
