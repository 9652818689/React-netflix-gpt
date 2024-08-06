import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSclice'
import {netflixlogo} from "../utils/constants";
import {AVATAR_LOGO} from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const [errMessage, setErrMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message)
    setErrMessage(message)
    if (message) return;
    if (!isSignInForm) {
      //sign UP logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value, photoURL: AVATAR_LOGO
          }).then(() => {
            const {uid,email,displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}));
            navigate('/browse');
          }).catch((error) => {
            setErrMessage(error)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + '-' + errMessage)
        });
    } else {
      //sign In logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + '-' + errMessage)
        });
    }

  }
  return (
    <div>
      <Header />
      <div>
        <img className='absolute' src={netflixlogo} />
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
        onSubmit={(e) => e.preventDefault()}>
        <h1 className='font-bold'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
        <p className='text-red-500 font-bold text-lg py-2'>{errMessage}</p>
        <button className='p-4 my-4 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? sign In Now."}</p>
      </form>
    </div>
  )
}

export default Login
