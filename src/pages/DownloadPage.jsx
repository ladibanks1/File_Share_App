import React from 'react'
import HeroSection from '../components/HeroSection'
import DownloadFile from '../components/DownloadFile'

const DownloadPage = () => {
  return (
    <div className="bg-blue-600 flex flex-col md:flex-row gap-10 justify-between md:p-20 p-5 pt-32 items-center h-[100vh]">
      <HeroSection />
      <DownloadFile />
    </div>
  )
}

export default DownloadPage