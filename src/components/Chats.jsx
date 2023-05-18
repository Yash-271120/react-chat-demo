import React,{useEffect, useState,useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import {onSnapshot,doc} from 'firebase/firestore';
import { db } from '../firebase';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    if(!currentUser.uid) return;
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
      
  });
  return unsub;
  }, [currentUser.uid])

  const handleUserSelect = (user) => {
    dispatch({type:'CHANGE_USER',payload:user});
  };
  return (
    <div className='text-black'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(([key,value])=>{
        return (
          <div key={key} className='p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-400' onClick={()=>handleUserSelect(value.userInfo)}>
        <img className='w-12 h-12 rounded-full' src={value.userInfo.photoURL} alt="" />
        <div>
          <span className='text-lg font-medium'>{value.userInfo.displayName}</span>
          <p className='text-sm text-gray-500'>{value.lastMessage?.text}</p>
        </div>
      </div>
        )
      })}

      
    </div>
  )
}

export default Chats