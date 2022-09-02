import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

// import firebase from 'firebase/app'
// import 'firebase/auth';

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
    }

useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })
    return unsubscribe

},[])

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
