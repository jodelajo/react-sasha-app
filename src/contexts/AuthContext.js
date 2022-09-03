import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // getAuth, 
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from "firebase/auth"

// import firebase from 'firebase/app'
// import 'firebase/auth';

const AuthContext = createContext()
// const auth2 = getAuth()
// console.log('auth', auth.currentUser)
// console.log('auth2', auth)


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
    }


    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function emailUpdate(email) {
        console.log('update email')
        return updateEmail(currentUser, email)
    }


    function passwordUpdate(password) {
        console.log('update password')
        return updatePassword(currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe

    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        emailUpdate,
        passwordUpdate
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
