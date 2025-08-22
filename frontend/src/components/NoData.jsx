import React from 'react'

const NoData = () => {
  return (
    <div className="p-4 w-full min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <img 
          src={'/images/nodata.png'} 
          alt="no data" 
          className="w-full h-auto object-contain" 
        />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        No Notes Available
      </h1>
    </div>
  )
}

export default NoData
