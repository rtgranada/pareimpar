import React, { useState , useEffect} from "react";
import {  doc, getDoc } from '@firebase/firestore';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from '../../context/UserAuthContext';
import { db } from "../../firebase";
import nonPicture from "../../imgs/NoNPictureUser.png";
import ReactWhatsapp from 'react-whatsapp';

export const MyProfile = () => {
  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();
  const [userDoc, setUserDoc]=useState('');
  const [userId, setUserId]=useState('');
  
    async function fetchUser () {
        const str = localStorage.getItem("uKey");
        const Nstr = str.substring(1, str.length - 1);
        user.uid ? setUserId(user.uid) : setUserId(Nstr);        
        if(userId) {
            const queryUser = doc(db, 'users', userId);
            await getDoc(queryUser).then(users => setUserDoc(users.data()))
        }        
    }

    useEffect(() => {  
        fetchUser()
    },[userId])

  const handleLogout = async () => {
    try {
        await logOut();
        navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  if(userDoc){
    return (
        <>
            <div className="p-4 box mt-3 text-center profileCard">
            Bem vindo <br />
            { userDoc?.userInfo.cover ? <img src={userDoc?.userInfo.cover} alt="" class="coverProfile"/> : <img src={nonPicture} alt="" class="coverProfile"/>}
            Nome: {userDoc?.userInfo.name} <br />

            E-mail: {userDoc?.userInfo.email} <br />
            Telefone: {userDoc?.userInfo.phone ? <>{userDoc?.userInfo.phone}<ReactWhatsapp number={userDoc?.userInfo.phone}>Whats</ReactWhatsapp></> : ''} <br />            
            Instagram: {userDoc?.userInfo.insta ? <a href={`http://www.instagram.com/${userDoc?.userInfo.insta}`} target="_blank" rel="noreferrer">@{userDoc?.userInfo.insta}</a> : "" }  <br />
            Aniversario: {userDoc?.userInfo.birth} <br />
            Status: {userDoc?.online ? "Ativo" : "Inativo"}
            </div>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </>
    )
  } else {
    return (
      
        <>
          <div className="p-4 box mt-3 text-center">
            Carregando... <br />            
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </>
      );
  }
    
 
  
};