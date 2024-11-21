import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import vid3 from "../assets/vid3.mp4";
import { checklistItems } from "../constants";

const AboutUs = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Discover{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-800 text-transparent bg-clip-text">
          Akademi Suria.
        </span>
      </h2>

      {/* Video Section */}
      <div className="flex flex-wrap justify-center">
        {/* Video */}
        <div className="p-2 w-full lg:w-1/2">
          <motion.video
            autoPlay
            loop
            muted
            className="rounded-lg w-full h-full object-cover border border-black shadow-sm shadow-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <source src={vid3} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </div>

        {/* Checklist Items */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              className="flex mb-12"
            >
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <FaCheckCircle />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
