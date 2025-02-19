import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#7b67af] text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
        <div>
           <span className="text-white">&lt;</span>
           Pass-Buddy
        <span className="text-white">&gt;</span>
        </div>
        <div className='flex justify-center items-center' >Created with love <img className='w-7 m-2' src="icons/heart.svg" alt="" /> by Muhammad Faiz</div>
    </div>
  )
}

export default Footer