import React from 'react'

const Login = () => {
  return (
    <div className='bg-gray-800 h-screen flex items-center justify-center'>
        <div className=' bg-white py-5 px-16 rounded-lg flex flex-col gap-3 items-center'>
            <span className='text-red-300 text-2xl font-bold'>One-to-One Chat</span>
            <span className='text-red-300 text-xs'>Register</span>
            <form className='flex flex-col gap-4'>
               
                <input className='p-4 border-gray-800 border-b-[1px] placeholder-gray-400' type="email" placeholder="email" />
                <input className='p-4 border-gray-800 border-b-[1px] placeholder-gray-400' type="password" placeholder="password" />
                <button className='bg-gray-800 text-white p-2 font-bold border-none cursor-pointer'>Sign in</button>
            </form>
            <p className='text-gray-800 text-xs mt-2'>You don&apos;t have an account? Register</p>
        </div>
    </div>
  )
}

export default Login