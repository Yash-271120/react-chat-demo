import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await  signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className=" bg-white py-5 px-16 rounded-lg flex flex-col gap-3 items-center">
        <span className="text-red-300 text-2xl font-bold">One-to-One Chat</span>
        <span className="text-red-300 text-xs">Login</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <button className="bg-gray-800 text-white p-2 font-bold border-none cursor-pointer">
            Sign in
          </button>
          {error && (
            <span className="text-red-500 text-xs">Something went wrong!</span>
          )}
        </form>
        <p className="text-gray-800 text-xs mt-2">
          You don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
