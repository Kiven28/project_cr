import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const hoverEffect = {
    scale: 1.08,
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.6, ease: 'easeInOut' },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center py-16 px-4"
      style={{ backgroundImage: `url('/path-to-your-background-image.jpg')` }}
    >
      {/* Thinner Divider Line */}
      <motion.div
        className="w-full h-0.5 bg-black mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 1, ease: 'easeInOut' } }}
      />

      {/* Title with Intersection Observer */}
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="text-4xl font-extrabold text-center mb-8"
        style={{ background: 'linear-gradient(to right, #6B46C1, #3182CE)', WebkitBackgroundClip: 'text', color: 'transparent' }}
      >
        Keep in touch with us
      </motion.h1>

      {/* Contact Form Section with Smooth Scroll Animations */}
      <motion.div
        className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        initial="hidden"
        animate={controls}
        variants={stagger}
      >
        {/* Left Side: Form with Hover Animations */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="p-6 md:p-8 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">Let’s collaborate and create something awesome together!</p>

          <motion.form>
            {/* Full Name */}
            <motion.div className="mb-4" whileHover={hoverEffect}>
              <motion.input
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                type="text"
                placeholder="Full Name"
                className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow relative"
                style={{ backgroundImage: `url('/path-to-icon.png')`, backgroundPosition: '8px center', backgroundRepeat: 'no-repeat' }}
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div className="mb-4" whileHover={hoverEffect}>
              <motion.input
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow relative"
                style={{ backgroundImage: `url('/path-to-phone-icon.png')`, backgroundPosition: '8px center', backgroundRepeat: 'no-repeat' }}
              />
            </motion.div>

            {/* Message */}
            <motion.div className="mb-4" whileHover={hoverEffect}>
              <motion.textarea
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
                rows="4"
              ></motion.textarea>
            </motion.div>

            {/* Submit Button with hover effect */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.3)' }}
              type="submit"
              className="w-full p-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:opacity-90 transition-opacity"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Right Side: Contact Information with Smooth Animations */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-r-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl">📞</span>
              <p className="ml-4 text-sm">
                Tel: +607-2528124, +607-256 2300
                <br />
                +6012-737 7674 (Kannan)
                <br />
                +6018-988 1244 (Marketing)
                <br />
                +6012-384 9502 (Shumi)
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-2xl">✉️</span>
              <p className="ml-4 text-sm">Email Us: info@suria.edu.my</p>
            </div>
            <div className="flex items-center">
              <span className="text-2xl">📍</span>
              <p className="ml-4 text-sm">Find Us:</p>
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-sm">Johor Bahru Office</p>
              <p className="text-sm">No.8-01, Jalan Suria 2, Bandar Seri Alam, 81750 Masai, Johor</p>
              <p className="text-sm">Selangor Office</p>
              <p className="text-sm">No.18, Jalan Gasing, 46000 Selangor</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
