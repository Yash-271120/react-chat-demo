import React, { useState,useContext } from "react";
import { collection, query, where, getDoc,getDocs, updateDoc,setDoc,doc,serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext} from '../context/AuthContext'
import {ChatContext} from '../context/ChatContext'

const Search = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  const handleSearchUser = async () => {
    const citiesRef = collection(db, "users");

    const q = query(citiesRef, where("displayName", "==", search));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.code === "Enter") {
      await handleSearchUser();
    }
  };

  const handleUserSelect = async(user) => {
    const combinedKey = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedKey));

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedKey), {
          messages: [],
        });

      await updateDoc(doc(db, "userChats", currentUser.uid),{
        [combinedKey+".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedKey+".date"]: serverTimestamp(),
       });


       await updateDoc(doc(db, "userChats", user.uid),{
        [combinedKey+".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedKey+".date"]: serverTimestamp(),
       });
      }
      dispatch({type:'CHANGE_USER',payload:user});
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setSearch("");
  };
  return (
    <div className="border border-b-gray-400 text-black">
      <div>
        <input
          className="bg-transparent border-none outline-none placeholder-slate-500"
          type="text"
          value={search}
          onKeyDown={handleKeyPress}
          placeholder="Find a user"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {error && (
        <span className="text-red-500 text-xs">User not found!</span>
      )}
      {user && (
        <div className="p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-400" onClick={()=>handleUserSelect(user)}>
        <img
          className="w-12 h-12 rounded-full"
          src={user.photoURL}
          alt=""
        />
        <div>
          <span className="text-lg font-medium">{user.displayName}</span>
        </div>
      </div>
      )}
    </div>
  );
};

export default Search;
