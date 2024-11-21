import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import Workflow from './components/Workflow';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import RecommendationsPage from './components/RecommendationsPage';
import graImage from './assets/gra.jpg';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -50,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

const App = () => {
  const heroSectionRef = useRef(null);
  const featureSectionRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const handleScrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom component to manage conditional navbar rendering and persistent WhatsApp button
  const Layout = ({ children }) => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/recommendations';

    return (
      <>
        {showNavbar && (
          <Navbar
            onNavigate={handleScrollToSection}
            refs={{
              heroSectionRef,
              featureSectionRef,
              workflowRef,
              testimonialsRef,
              contactRef,
            }}
          />
        )}
        {/* Persistent WhatsApp Chat Button */}
        <a
          href="https://wa.me/60182077411?text=I%20am%20interested%20to%20join%20a%20course%20at%20Akademi%20Suria."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </a>
        {children}
      </>
    );
  };

  return (
    <Router>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          backgroundImage: `url(${graImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <div id="home" ref={heroSectionRef}>
                  <HeroSection />
                </div>
                <div id="features" ref={featureSectionRef}>
                  <FeatureSection />
                </div>
                <div id="workflow" ref={workflowRef}>
                  <Workflow />
                </div>
                <div id="testimonials" ref={testimonialsRef}>
                  <Testimonials />
                </div>
                <div id="contact" ref={contactRef}>
                  <Contact />
                </div>
              </Layout>
            }
          />
          <Route
            path="/recommendations"
            element={<RecommendationsPage />}
          />
        </Routes>
      </motion.div>
    </Router>
  );
};

export default App;
