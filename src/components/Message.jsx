import React from 'react'

const Message = () => {
  return (
    <div className='flex'>
      <div className='max-w-md flex flex-col gap-3 m-2 '>
        <p className='bg-white max-w-max text-black rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg px-5 py-2'>Hello</p>
        <img className='w-1/2' src='https://images.pexels.com/photos/13235072/pexels-photo-13235072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
      </div>

      {/* <div className='max-w-md flex flex-col gap-3 m-2 items-end'>
        <p className='bg-white max-w-max text-black rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-lg px-5 py-2'>Hello</p>
        <img className='w-1/2' src='https://images.pexels.com/photos/13235072/pexels-photo-13235072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
      </div> */}
    </div>
  )
}

export default Message