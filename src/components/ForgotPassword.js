import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  //   const navigate = useNavigate()

  async function handlerSubmit(e) {
    e.preventDefault()
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions.')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <>

      <Card>
        <Card.Body>

          <h2 className='text-center mb-4'>
            Password Reset
          </h2>
          {error && <Alert variant='danger'> {error} </Alert>}
          {message && <Alert variant='success'> {message} </Alert>}
          <Form onSubmit={handlerSubmit}>
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button type="submit" disabled={loading} className='w-100 mt-3'>Reset password</Button>
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account yet?
        <Link to="/signup"> Sign up. </Link>
      </div>
    </>
  )
}
