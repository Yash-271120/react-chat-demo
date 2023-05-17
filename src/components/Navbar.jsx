import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center bg-slate-500 p-3 h-14 justify-between'>
      <span className='font-bold hidden lg:block'>One-to-One Chat</span>
      <div className='flex gap-2'>
        <img className='bg-slate-300 h-6 w-6 rounded-full object-cover' src='https://images.pexels.com/photos/14664619/pexels-photo-14664619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' />
        <span>Yash</span>
        <button className='bg-slate-500 lg:bg-slate-300 cursor-pointer text-xs p-1 absolute lg:static bottom-3'>logout</button>
      </div>
    </div>
  )
}

export default Navbar