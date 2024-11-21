import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import { useLocation } from 'react-router-dom';
import backgroundImage from '../assets/gra.jpg';
import { courseDescriptions, coursesByCategory } from '../constants/index';

const RecommendationsPage = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];
  const selectedCategory = location.state?.selectedCategory || 'Leadership and Management';

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Set a timer to handle the loading state
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  const featuredCourses = coursesByCategory[selectedCategory] || [];

  // Limit recommended courses to a maximum of 5 and split them into rows
  const topRow = recommendations.slice(0, 3);
  const bottomRow = recommendations.slice(3, 5);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading && <LoadingScreen />}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1200px] p-8 rounded-lg bg-white bg-opacity-90 shadow-xl"
        >
          {/* Section 1: Header */}
          <h1 className="text-5xl font-bold mb-6 text-center text-gray-900 tracking-wide">
            Recommended Courses For You
          </h1>

          {/* Section 2: Recommended Courses */}
          <div className="space-y-6 mb-12">
            {/* Top Row */}
            <div className={`grid grid-cols-${topRow.length} gap-6`}>
              {topRow.map((course, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${
                    index % 2 === 0 ? 'bg-[#ffefe0]' : 'bg-[#e6e7ff]'
                  }`}
                  whileHover={{ y: -5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}
                >
                  <h2 className="text-lg font-semibold">{course.title || course}</h2>
                  <p className="mt-2 text-gray-600">
                    {courseDescriptions[course.title || course] || 'Explore this amazing course!'}
                  </p>
                  <button className="mt-4 px-4 py-2 text-white bg-[#333] rounded-full hover:bg-[#222] transition-colors duration-200">
                    Enroll Now
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row */}
            {bottomRow.length > 0 && (
              <div className={`grid grid-cols-${bottomRow.length} gap-6`}>
                {bottomRow.map((course, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${
                      index % 2 === 0 ? 'bg-[#ffefe0]' : 'bg-[#e6e7ff]'
                    }`}
                    whileHover={{ y: -5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}
                  >
                    <h2 className="text-lg font-semibold">{course.title || course}</h2>
                    <p className="mt-2 text-gray-600">
                      {courseDescriptions[course.title || course] || 'Explore this amazing course!'}
                    </p>
                    <button className="mt-4 px-4 py-2 text-white bg-[#333] rounded-full hover:bg-[#222] transition-colors duration-200">
                      Enroll Now
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Featured Courses */}
          <h2 className="text-3xl font-bold text-center mb-6">Featured Courses</h2>
          <section className="py-8">
            <div className="hide-scrollbar flex overflow-x-auto gap-6 px-4">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[300px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold">{course}</h3>
                    <p className="mt-4 text-sm">
                      {courseDescriptions[course] || 'Discover this featured course!'}
                    </p>
                    <button className="mt-6 px-6 py-2 bg-white text-purple-500 rounded-full hover:bg-gray-100 transition-all">
                      Enroll Now
                    </button>
                    <span className="absolute top-2 right-2 bg-white text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                      {index % 2 === 0 ? 'NEW' : 'TRENDING'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
};

export default RecommendationsPage;
