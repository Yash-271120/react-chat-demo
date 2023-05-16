import React, {useState,useEffect} from 'react'
import Message from './Message';



import { collection, query, onSnapshot, orderBy, limit,addDoc, serverTimestamp } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { v4 } from 'uuid';

const Channel = ({user=null,db=null,storage=null}) => {
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');
    const [imageUpload,setImageUpload] = useState(null);

    useEffect(()=>{
        if(db){
            const q = query(collection(db,'messages'),orderBy('createdAt'),limit(100));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id:doc.id,
                }));
                setMessages(data);
              });
            return unsubscribe;
        }
    },[db]);

    const uploadImage = async (e)=>{
        if(!imageUpload) return null;
        const storageRef = ref(storage,`chat/images/${imageUpload.name+v4()}`);
        const response = await uploadBytes(storageRef,imageUpload);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    }

    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        if(db){
            const docRef = collection(db,'messages');
            let url = await uploadImage();

           // console.log(typeof url);
            addDoc(docRef,{
                text:newMessage,
                createdAt:serverTimestamp(),
                uid:user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL,
                imageUrl:url,
                isImageMessage:(url!=null),
            })
        }
        setNewMessage('');
        setImageUpload(null);
    }
    console.log(!newMessage,!imageUpload);
  return (
    <>
    <ul>
        {messages.map((message)=>{
            return (
                <li key={message.id}>
                    <Message {...message}/>
                </li>
            )
        })}
    </ul>
    <form onSubmit={handleOnSubmit}>
        <input type="text" 
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e)=>setNewMessage(e.target.value)}
        />
        <input type="file" onChange={(e)=>setImageUpload(e.target.files[0])}/>
        <button type="submit" disabled={!newMessage && !imageUpload}>Send</button>
    </form>
    </>
  )
}

export default Channel