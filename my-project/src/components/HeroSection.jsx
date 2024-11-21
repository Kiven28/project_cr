import React, { useRef } from 'react';
import video1 from '../assets/vid4.mp4';
import video2 from '../assets/vid7.mp4';
import aiIcon from '../assets/ai-icon.png'; // Add your AI icon path here

const HeroSection = () => {
  const featureSectionRef = useRef(null);

  const handleScrollToFeature = () => {
    if (featureSectionRef.current) {
      window.scrollTo({
        top: featureSectionRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center mt-6 lg:mt-14">
      {/* Background AI icon */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center opacity-10"
        style={{
          backgroundImage: `url(${aiIcon})`,
          backgroundSize: '50%',
          zIndex: -1,
        }}
      ></div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Find Your Course with
        <div className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text inline-block font-bold">
          AI Recommendations
        </div>
      </h1>
      <p className="mt-6 lg:mt-8 text-lg text-center text-neutral-500 max-w-4xl">
        Unlock your potential by finding personalized course suggestions based on your interests and industry trends. Let our AI guide you towards the perfect learning path at Akademi Suria!
      </p>
      <div className="flex justify-center my-8 lg:my-10">
        <button
          onClick={handleScrollToFeature}
          className="relative text-white bg-gradient-to-r from-purple-500 to-blue-800 py-3 px-6 mx-3 rounded-md transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          Get Started
          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 to-purple-800 opacity-20 blur-lg animate-pulse"></span>
        </button>
      </div>

      <div className="flex mt-8 lg:mt-10 justify-center space-x-4 w-full max-w-screen-xl">
        <div className="relative w-full aspect-video">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-full h-full object-cover border border-black shadow-sm shadow-black"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative w-full aspect-video">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-full h-full object-cover border border-black shadow-sm shadow-black"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div ref={featureSectionRef}></div>
    </div>
  );
};

export default HeroSection;
