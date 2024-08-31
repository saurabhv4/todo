import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-600 text-white py-2'>
      <div className='logo'>
        <span className='font-bold text-xl mx-8'>iTask</span>
      </div>
      <ul className='flex gap-6 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
      </ul>
    </nav>
  )
}

export default navbar
