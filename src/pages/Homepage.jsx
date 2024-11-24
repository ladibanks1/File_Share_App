import React from "react";
import UploadForm from "../components/UploadForm";
import HeroSection from "../components/HeroSection";

const Homepage = () => {
  return (
    <div className="bg-blue-600 flex flex-col md:flex-row gap-10 justify-between md:p-20 p-5 pt-32 items-center">
      <HeroSection />
      <UploadForm />
    </div>
  );
};

export default Homepage;
