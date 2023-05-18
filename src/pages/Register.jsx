import React, { useState } from "react";
import Add from "../assets/addAvatar.png";

import { auth, storage,db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];
    if(!avatar) return setError(true);
    const isImage = (avatar) => avatar['type'].includes('image');
    if(!isImage(avatar)) return setError(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );

      
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className=" bg-white py-5 px-16 rounded-lg flex flex-col gap-3 items-center">
        <span className="text-red-300 text-2xl font-bold">One-to-One Chat</span>
        <span className="text-red-300 text-xs">Register</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-4 border-gray-800 border-b-[1px] placeholder-gray-400"
            type="text"
            placeholder="display name"
          />
          <input
            className="p-4 border-gray-800 border-b-[1px] placeholder-gray-400"
            type="email"
            placeholder="email"
          />
          <input
            className="p-4 border-gray-800 border-b-[1px] placeholder-gray-400"
            type="password"
            placeholder="password"
          />
          <input style={{ display: "none" }} type="file" id="file" />
          <label
            className="flex flex-row items-center text-gray-800 text-xs cursor-pointer"
            htmlFor="file"
          >
            <img className="w-8" src={Add} />
            <span>Add an avatar</span>
          </label>
          <button className="bg-gray-800 text-white p-2 font-bold border-none cursor-pointer">
            Sign up
          </button>
          {error && (
            <span className="text-red-500 text-xs">Something went wrong!</span>
          )}
        </form>
        <p className="text-gray-800 text-xs mt-2">
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
