import React,{useState} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Img from '../assets/img.png'
import Attach from '../assets/attach.png'
import { updateDoc,doc,arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db,storage } from '../firebase';
import { v4 } from 'uuid';

const Input = () => {
  const [text,setText] = useState('');
  const [image,setImage] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  console.log(image);
  const isImage = (file) => file['type'].includes('image')
  const handleSend = async () => {
    if(image){
      const storageRef = ref(storage,v4());
      const uploadTask = uploadBytesResumable(storageRef, image);
      console.log(image);
      uploadTask.on(
        (error) => {
          console.log(error);
         // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL,image);
            await updateDoc(doc(db, "chats", data.chatId),{
              messages:arrayUnion({
                id:v4(),
                text:text,
                senderId:currentUser.uid,
                timestamp:Timestamp.now(),
                img:downloadURL,
                isImage:isImage(image)
              })
            })
          });
        }
      );
      
    }else{
      await updateDoc(doc(db, "chats", data.chatId),{
        messages:arrayUnion({
          id:v4(),
          text:text,
          senderId:currentUser.uid,
          timestamp:Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]: {
        text:text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId+".lastMessage"]: {
        text:text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    setText('');
    setImage(null);
  }
  return (
    <div className='h-14 p-2 bg-white flex items-center justify-between text-black'>
      <input value={text} onChange={(e)=>setText(e.target.value)} type='text' placeholder='Type a message' className=' w-full border-none outline-none text-lg' />
      <div className='flex items-center gap-2'>
        <input type="file" id='file' accept='image/*' style={{display:'none'}} onChange={e=>setImage(e.target.files[0])}/>
        <label htmlFor="file">
        <img className='h-8 w-8 cursor-pointer' src={Attach} alt=""/>
        </label>
        <button className='py-2 px-3 bg-gray-800 text-white rounded-lg' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input