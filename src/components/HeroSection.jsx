import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="text-white font-bold md:text-3xl text-2xl sm:w-1/2 w-3/4">
      <h1 className="md:text-5xl text-3xl">
        <FaPaperPlane className="inline me-4 ms-1 text-6xl" />
        File Share
      </h1>
      <p className="mt-4">
        Share your files easily and securely with our platform.
      </p>
    </div>
  );
};

export default HeroSection;
