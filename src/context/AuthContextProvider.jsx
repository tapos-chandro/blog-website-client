import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';




export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [loading, seLoading] = useState(true);
    const [user, setUser] = useState(null);




    const createNewUser = (email, password) => {
        seLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {displayName: name, photoURL: photo})
    }

    const loginUser = (email, password) => {
        seLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        return signOut(auth)
    }


    

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
                seLoading(false);
                // const updateUserProfile = (name, photo ) => {
                //     return updateProfile(auth.currentUser{
                //         console.log()
                //     })
                // }
            }
            else{
                setUser(null);
                seLoading(false);
            }
        } ) 
        return () => unsubscribe();
    } , []);

    

    

    const authInfo = {
        user,
        createNewUser,
        loading,
        loginUser,
        googleLogin,
        updateUserProfile,
        signOutUser
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;