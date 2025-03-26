import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';



export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {

    const [loading, seLoading] = useState(true);

    const [user, setUser] = useState(null);

    const createNewUser = (email, password) => {
        seLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginUser = (email, password) => {
        seLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
                seLoading(false);
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
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;