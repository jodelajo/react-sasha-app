import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import {  updateProfile } from 'firebase/auth'


export default function UpdateProfile() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, passwordUpdate, emailUpdate } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handlerSubmit(e) {
        e.preventDefault()
        console.log('current user', currentUser)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        setMessage('')
        if (nameRef.current.value !== currentUser.displayName) {
            promises.push(updateProfile(currentUser, {
                displayName: nameRef.current.value}))
        }
        if (emailRef.current.value !== currentUser.email) {
            promises.push(emailUpdate(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(passwordUpdate(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
            setMessage("Your profile is updated")
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>
                        Update Profile
                    </h2>
                    {error && <Alert variant='danger'> {error} </Alert>}
                    {message && <Alert variant='success'> {message} </Alert>}
                    <Form onSubmit={handlerSubmit}>
                    <Form.Group id="name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" ref={nameRef} required 
                            defaultValue={currentUser.displayName}
                            />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>
                                Password confirmation
                            </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Button type="submit" disabled={loading} className='w-100 mt-3'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to="/"> Cancel </Link>
            </div>
        </>
    )
}
