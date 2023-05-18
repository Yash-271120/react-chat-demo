import React,{useContext} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='flex items-center bg-slate-500 p-3 h-14 justify-between'>
      <span className='font-bold hidden lg:block'>One-to-One Chat</span>
      <div className='flex gap-2'>
        <img className='bg-slate-300 h-6 w-6 rounded-full object-cover' src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className='bg-slate-500 lg:bg-slate-300 cursor-pointer text-xs p-1 absolute lg:static bottom-3'>logout</button>
      </div>
    </div>
  )
}

export default Navbar