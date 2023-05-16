import { useState,useEffect } from "react";

import Button from "./components/Button.jsx";
import Channel from "./components/Channel.jsx";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  const signOutWithGoogle = async ()=>{
    try {
      await signOut(auth);
      alert("Signed out successfully!")
    } catch (error) {
      console.error(error);
    }
  }

  if(initializing) return "Loading...";
  return (
    <>
      <h1>Chat app</h1>
      {user ? 
      <>
      <Button onClick={signOutWithGoogle}>Sign Out</Button>
      <h1>Welcome To the ChatRoom</h1>
      <Channel user={user} db={db} storage={storage}/>
      </>
      : <Button onClick={signInWithGoogle}>Sign in with Google</Button>}
    </>
  )
}

export default App
