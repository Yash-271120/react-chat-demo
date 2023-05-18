import React,{useContext,useState,useEffect,useRef} from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import {onSnapshot,doc} from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const {data} = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  useEffect(()=>{
    ref.current.scrollIntoView({behavior:'smooth'});
  },[messages])

  useEffect(()=>{
    if(!data.chatId) return;
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if(doc.exists()){
        setMessages(doc.data().messages);
      }
  })
  return unsub;
},[data.chatId])
  return (
    <div className='bg-slate-500 h-[calc(100%-112px)] overflow-y-scroll'>
      {messages.map((message)=>{
        return <Message message={message} key={message.id}/>
      })}
      <div ref={ref}></div>
    </div>
  )
}

export default Messages