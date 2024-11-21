import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion for animations
import { useState, useEffect } from "react";

export const testimonials = [
  {
    user: "Siti Salmirah",
    text: `"A great mix of skills development and academic learning."
    
    Corona ruined most of it, but can't blame the college. Teachers are passionate about seeing their student succeed. Loved every minute studying and gained great knowledge. I would definitely recommend it to others `,
  },
  {
    user: "Reena Annandan",
    text: `Good day! Just a quick message to express my gratitude for the 1-1 KPI Consultation and Dashboard Setup in Microsoft Excel. Thank you so much, sir. Your expertise was invaluable, and I really appreciate you taking the time to visit my place to understand my business.`,
  },
  {
    user: "Chrissya Dona",
    text: `I learned more about Microsoft Excel, Word and PowerPoint. I recommend taking this class because you can gain more knowledge about using all of Microsoft tools. The class environment is comfortable, and the teacher is friendly! 👍🏻
    
    Highly recommend especially for students who want to further their study related to using Microsoft. 👍🏻`,
  },
  {
    user: "Revathi Krishnan",
    text: `Thank you so much for giving me the opportunity to study at Kolej Teknologi Suria. Now I have completed my studies in diploma information system administration. ☺️ I've developed my computer skills, admin skills, and leadership too. Again, thank you to my lecturers for being supportive. 🙏🏽😊❤️`,
  },
  {
    user: "Aamir Ghufran",
    text: `Assalam O alaikum ... Hope for the best to everyone! My name is Aamir Ghufran from Pakistan. I have been working here in Malaysia for almost a year as a QC Inspector.Finally, I found KTS, which was really impressive and affordable. From the first day of my course, I realized that KTS is one of the best institutes.`,
  },
  {
    user: "Pu Wanah",
    text: `College has provided me with a number of opportunities to grow and explore my skills. I have always found a positive and healthy environment, and the teachers are highly supportive. Thank you for all of that.`,
  },
  {
    user: "Velava Jeeva",
    text: `I studied in KTS College as an information system administration student. I learned many skills and knowledge about administration, leadership, and more related to management. The lecturers were really friendly, and the environment was very attractive. Thanks a lot to the college for giving me the opportunity to study in this wonderful college.`,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Changed to 4 seconds for smoother transitions

      return () => clearInterval(interval); // Cleanup
    }
  }, [isPaused]);

  // Enhanced animation variants with slower transitions and smoother feel
  const variants = {
    enter: {
      x: "100%", // Enter from right
      opacity: 0,
      rotateY: 90, // Add 3D rotation for an entry effect
      scale: 0.8, // Start scaled down
      filter: "blur(10px)", // Blur when entering
    },
    center: {
      x: 0, // Center position
      opacity: 1,
      rotateY: 0, // Reset rotation to face forward
      scale: 1, // Scale to normal size
      filter: "blur(0px)", // Remove blur
      transition: {
        type: "spring",
        stiffness: 100, // Reduced stiffness for smoothness
        damping: 25, // Increased damping for softer feel
        duration: 1.5, // Slower animation for smoothness
        ease: "easeInOut",
        when: "beforeChildren", // Ensure children animations complete after main one
      },
    },
    exit: {
      x: "-100%", // Exit to left
      opacity: 0,
      rotateY: -90, // Rotate out in the opposite direction
      scale: 0.8, // Scale down on exit
      filter: "blur(10px)", // Add blur when exiting
      transition: {
        duration: 1.5, // Slower animation for smoothness
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="mt-20 tracking-wide relative">
      {/* Decorative Line */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-[150px] h-[3px] bg-gradient-to-r from-purple-500 to-blue-500 rounded" />
      </div>

      {/* Section Title */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What people are saying about
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          {" "}Akademi Suria
        </span>
      </h2>

      {/* Testimonial card container */}
      <div className="flex justify-center relative w-full h-auto sm:h-[600px] px-4">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute flex flex-col justify-between w-full sm:w-[800px] h-auto sm:h-[450px] bg-white/30 backdrop-blur-md rounded-xl shadow-2xl text-neutral-900 border border-neutral-600 p-6 sm:p-12"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            onMouseEnter={() => setIsPaused(true)} // Pause on hover
            onMouseLeave={() => setIsPaused(false)} // Resume on leave
            style={{ perspective: 1000 }} // Enable 3D perspective for the rotation effect
          >
            <div className="text-center w-full">
              {/* Division line at top between previous and current */}
              <div className="w-full h-[2px] bg-black mb-4 sm:mb-8" /> {/* Top Black dividing line */}
              
              <p className="text-sm sm:text-xl font-light mb-4 sm:mb-8 leading-relaxed"> {/* Adjusted spacing for cleaner look */}
                {testimonials[currentIndex].text}
              </p>
              
              <div className="flex items-center justify-center mb-4"> {/* Moved spacing adjustment */}
                <div className="ml-6 text-left">
                  <h6 className="text-lg sm:text-3xl font-semibold">{testimonials[currentIndex].user}</h6> {/* Larger font size */}
                </div>
              </div>

              {/* Placeholder for Ratings */}
              <div className="flex justify-center mt-4">
                <span className="text-yellow-400 text-lg sm:text-2xl">⭐⭐⭐⭐⭐</span> {/* Example star rating */}
              </div>

              {/* Division line at the bottom */}
              <div className="w-full h-[2px] bg-black mt-4 sm:mt-8" /> {/* Bottom Black dividing line */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;
