import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc , setDoc, doc} from "@firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});  
  const notificationsCollectionRef = collection(db, 'notifications');


  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password, name, instagram, phone, cover) {
    return createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const newUser = result.user;
      if(newUser.metadata.creationTime === newUser.metadata.lastSignInTime) {
        const NovoUsuario = {
          created: new Date(),
          msgids: '',
          uid: newUser.uid,
          online: true,
          userInfo: {
            name: name,
            cover: cover,
            birth: '',
            phone: phone,
            city: '',
            insta: instagram,
            email: newUser.email
          },
          customatization: {
            color: '#10325c',
            themecolor: '#0f6ce6',
            dakmode: false,
            widemode: false,
          }
        }
        const docRef = doc(db, "users", newUser.uid)
        setDoc(docRef, NovoUsuario).then(docRef => {
          console.log('Gravado com sucesso')
        }).catch(error => {
          console.log('error', error)
        })
        addDoc(notificationsCollectionRef, {
          notifications: []
        })
      }
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;

      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
      console.log('email', email);
      console.log('credential', credential);
    })
  }
  function logOut() {
    localStorage.removeItem("uKey");
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    
    return signInWithPopup(auth, googleAuthProvider).then((result) => {
      const newUser = result.user;
      if(newUser.metadata.creationTime === newUser.metadata.lastSignInTime) {
        const NovoUsuario = {
          created: new Date(),
          msgids: '',
          uid: newUser.uid,
          online: true,
          userInfo: {
            name: newUser.displayName,
            cover: newUser.photoURL,
            birth: '',
            phone: newUser.phoneNumber,
            city: '',
            insta: '',
            email: newUser.email
          },
          customatization: {
            color: '#10325c',
            themecolor: '#0f6ce6',
            dakmode: false,
            widemode: false,
          }
        }
        const docRef = doc(db, "users", newUser.uid)
        setDoc(docRef, NovoUsuario).then(docRef => {
          console.log('Gravado com sucesso')
        }).catch(error => {
          console.log('error', error)
        })
        addDoc(notificationsCollectionRef, {
          notifications: []
        })
      }
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;

      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
      console.log('email', email);
      console.log('credential', credential);
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      //console.log("Auth", currentuser);
      setUser(currentuser);
      if(currentuser){
        localStorage.setItem("uKey", JSON.stringify(currentuser.uid));
      }
      
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}


