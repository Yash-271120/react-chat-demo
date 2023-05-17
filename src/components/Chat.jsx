import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='basis-2/3 h-full  bg-slate-300'>
      <div className='h-14 items-center flex'>
        <span className='text-black p-2 text-lg font-medium'>Joe</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat