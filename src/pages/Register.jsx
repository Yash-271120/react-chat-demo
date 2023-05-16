import React from 'react'
import Add from '../assets/addAvatar.png'

const Register = () => {
  return (
    <div className='bg-gray-800 h-screen flex items-center justify-center'>
        <div className=' bg-white py-5 px-16 rounded-lg flex flex-col gap-3 items-center'>
            <span className='text-red-300 text-2xl font-bold'>One-to-One Chat</span>
            <span className='text-red-300 text-xs'>Register</span>
            <form className='flex flex-col gap-4'>
                <input className='p-4 border-gray-800 border-b-[1px] placeholder-gray-400' type="text" placeholder="display name" />
                <input className='p-4 border-gray-800 border-b-[1px] placeholder-gray-400' type="email" placeholder="email" />
                <input className='p-4 border-gray-800 border-b-[1px] placeholder-gray-400' type="password" placeholder="password" />
                <input style={{display:"none"}} type="file" id='file'/>
                <label className="flex flex-row items-center text-gray-800 text-xs cursor-pointer" htmlFor="file">
                    <img className='w-8' src={Add}/>
                    <span>Add an avatar</span>
                </label>
                <button className='bg-gray-800 text-white p-2 font-bold border-none cursor-pointer'>Sign up</button>
            </form>
            <p className='text-gray-800 text-xs mt-2'>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default Register