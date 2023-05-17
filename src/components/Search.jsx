import React from 'react'

const Search = () => {
  return (
    <div className='border border-b-gray-400 text-black'>
      <div>
        <input className='bg-transparent border-none outline-none placeholder-slate-500' type="text" placeholder="Find a user" />
      </div>
      <div className='p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-400'>
        <img className='w-12 h-12 rounded-full' src="https://images.pexels.com/photos/14664619/pexels-photo-14664619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div>
          <span className='text-lg font-medium'>John</span>
        </div>
      </div>
    </div>
  )
}

export default Search