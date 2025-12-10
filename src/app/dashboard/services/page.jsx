import React from 'react'
import Services from "@/components/services/Services.jsx";

function page() {
  return (
    <>
    <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our
            </span>
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              &nbsp;Services
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            From websites to videos, we make your brand look amazing everywhere.
          </p>
        </div>
         <Services/>
        
        </>
   
  )
}

export default page