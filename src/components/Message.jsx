import React,{useEffect} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import UnsupportedImage from '../assets/unsupported_image.png'

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    <div className={`flex ${message.senderId === currentUser.uid?`flex-row-reverse`:``}`}>
      {message.senderId === currentUser.uid ? (
        <div className='max-w-md flex flex-col gap-3 m-2 items-end'>
          {message.img && <img className='w-1/2' src={message.img==="NOT_SUPPORTED"?UnsupportedImage:message.img} alt=''/>}
        
          {message.text && <p className='bg-white max-w-max text-black rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-lg px-5 py-2'>{message.text}</p>} 
      </div>
      ):(
        <div className='max-w-md flex flex-col gap-3 m-2 '>
          {message.img && <img className='w-1/2' src={message.img==="NOT_SUPPORTED"?UnsupportedImage:message.img} alt=''/>}
       {message.text && <p className='bg-white max-w-max text-black rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg px-5 py-2'>{message.text}</p>} 
      </div>
      )}
    </div>
  )
}

export default Message