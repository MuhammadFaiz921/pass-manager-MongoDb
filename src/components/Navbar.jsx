import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#7b67af] 7b67af text-black '>
      <div className="mycontainer flex justify-between 
    items-center px-4 py-2 h-12">


      <div className="logo font-bold text-white text-2xl ">
        <span className="text-[#bda8f0]">&lt;</span>
        Pass-Buddy
        <span className="text-[#bda8f0]">&gt;</span>
        </div>

      
      <button className=' bg-[#ad94eb]  rounded-md flex hover:bg-[#9678c8]
      justify-between items-center ring-white ring-1'>
        <img className='invert w-9 p-1' src="/icons/github.svg" alt="github logo" />
        <span className='invert font-bold px-1' >GitHub</span>
      </button>
      </div>
    </nav>
  )
}

export default Navbar