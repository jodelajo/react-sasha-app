import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import {  auth, db } from '../../firebase';
import {  collection, addDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {  currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

   
   

    async function handlerSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            const res = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            console.log(res.user)
            console.log('???', auth.currentUser)
            const user = res.user
            updateProfile(auth.currentUser, {
              displayName: nameRef.current.value
            })
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: nameRef.current.value,
                email: user.email,
              });
          
            navigate("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
        console.log('?', currentUser)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>
                        Sign up
                    </h2>
                    {error && <Alert variant='danger'> {error} </Alert>}
                    <Form onSubmit={handlerSubmit}>
                        <Form.Group id="name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>
                                Password confirmation
                            </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button type="submit" disabled={loading} className='w-100 mt-3'>Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account?
                <Link to="/login"> Log in. </Link>
            </div>
        </>
    )
}
