import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='bg-gray-800 h-screen text-white flex items-center justify-center'>
      <div className=' border rounded-lg w-11/12 lg:w-2/3 h-4/5 flex overflow-hidden'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home