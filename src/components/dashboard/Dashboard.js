import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from '@firebase/firestore'
import styles from './Dashboard.module.css'
import { Button } from 'react-bootstrap'

export default function Dashboard() {
    const { currentUser } = useAuth()
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    // const [error, setError] = useState('')
    const [newName, setNewName] = useState('')
    const [newAge, setNewAge] = useState(0)
    const usersRef = collection(db, "users")
    const coursesRef = collection(db, "vakken")

    // console.log(coursesRef)
    console.log('current user', currentUser)
    // console.log(users)




    const createUser = async () => {
        console.log(newName)
        console.log(newAge)
        await addDoc(usersRef, { name: newName, age: newAge })
    }

    const updateUser = async (id, name) => {
        const userDoc = doc(db, "users", id)
        const newFields = { name: name }
        await updateDoc(userDoc, newFields)
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersRef)
            setUsers(data.docs.map((doc, i) => ({ ...doc.data(), id: doc.id })))
        }

        const getCourses = async () => {
            const data = await getDocs(coursesRef)
            setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getCourses()
        getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <div>
            <h1>Project {currentUser.displayName}</h1>
            <div className={styles.buttonWrapper}>
                <Link type="button" className={styles.button} to="/courses">Vakken</Link>
                <Link type="button" className={styles.button} to="/profile">profiel</Link>
            </div>
            <div className={styles.createWrapper}>
                <input placeholder='name' onChange={(e) => {
                    setNewName(e.target.value)
                }} />
                <input placeholder='age' type="number" onChange={(e) => {
                    setNewAge(e.target.value)
                }} />
                <button onClick={createUser}>Create user</button>
            </div>

            <div>
                {users.map(user => {
                    return (
                        <div key={user.id}>
                            <h2>{user.name}</h2>
                            <input placeholder='name' onChange={(e) => {
                                setNewName(e.target.value)
                            }} />
                            <Button onClick={() => updateUser(user.id, newName)}>Change Name</Button>
                            <Button onClick={() => deleteUser(user.id)}>Delete user</Button>
                        </div>
                    )
                })}
            </div>

            <div>
                {courses.map((course) => {
                    return (
                        <div key={course.id}>
                            <h2>{course.vak}</h2>
                            <p>{course.gem_cijfer}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
