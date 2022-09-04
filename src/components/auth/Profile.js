import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // console.log(coursesRef)



    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div>
            <Link type="button" to="/">Dashboard</Link>
            <Card>
                <Card.Body className='text-dark'>
                    <h2 className='text-center mb-4'>
                        Profile
                    </h2>
                    {error && <Alert variant='danger'> {error} </Alert>}
                    <div className='d-flex flex-column'>
                        <p>
                            <strong>Name </strong> {currentUser?.displayName}
                        </p>
                        <p>
                            <strong>Email: </strong> {currentUser?.email}
                        </p>

                    </div>

                    <Link to="/update-profile" className='btn btn-primary w-100 mt-3'> Update profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    )
}
