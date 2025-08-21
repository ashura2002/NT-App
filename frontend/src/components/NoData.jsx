import React from 'react'

const NoData = () => {
  return (
    <div className='p-2 w-full grid gap-5 place-items-center'>
      <div className='w-[400px]'>
        <img src={'/images/nodata.png'} alt="no data" className='w-full' />
      </div>
      <h1 className='text-2xl '>No Notes Available</h1>
    </div>
  )
}

export default NoData