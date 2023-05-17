import React from 'react'
import Img from '../assets/img.png'
import Attach from '../assets/attach.png'

const Input = () => {
  return (
    <div className='h-14 p-2 bg-white flex items-center justify-between text-black'>
      <input type='text' placeholder='Type a message' className=' w-full border-none outline-none text-lg' />
      <div className='flex items-center gap-2'>
        <input type="file" id='file' style={{display:'none'}}/>
        <label htmlFor="file">
        <img className='h-8 w-8 cursor-pointer' src={Attach} alt=""/>
        </label>
        <button className='py-2 px-3 bg-gray-800 text-white rounded-lg'>Send</button>
      </div>
    </div>
  )
}

export default Input