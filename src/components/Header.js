import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSclice'
import { header_logo } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  
  useEffect(()=>{
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const {uid,email,displayName, photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}));
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    //unsubscribe when component unmount
    return () => unsubscribe();
  },[])
  console.log(user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // navigate('/error')
    });
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b-from-black z-10 flex justify-between'>
      <img className='w-44' src={header_logo} />
      {user && (
        <div className='flex'>
          <img src={user?.photoURL} alt='' />
          <button className='font-bold text-black' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>

  )
}

export default Header
