import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase';
import MyButton from '../links/Button';
import MyLink from '../links/Link';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

export default function Courses() {
  const [dbCourses, setDbCourses] = useState()
  const [newCourses, setNewCourses] = useState('')

  const coursesRef = collection(db, "courses")
  let addCourses = async () => {
    const docRef = await addDoc(collection(db, "courses"), {
      name: newCourses,
      // id: docRef.id,
    });
    await addDoc(docRef, {...docRef, id: docRef.id})
    console.log("Document written with ID: ", docRef.id);
    console.log('dbcourses', dbCourses)
    console.log('new courses', newCourses)
  }
  const deleteCourse = async (id) => {
    const userDoc = doc(db, "courses", id)
    await deleteDoc(userDoc)
}


  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(coursesRef)
      setDbCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getCourses()
  }, [coursesRef])

  return (
    <div>
        {MyLink("button", "Dashboard" ,"/")}
      <h1>Mijn vakken</h1>
      <input type="text" placeholder='Naam...' onChange={(e) => {
        setNewCourses(e.target.value)
      }} />
      {/* <button onClick={addCourses}>Voeg toe</button> */}
      {MyButton("button", "Voeg toe", addCourses)}

      {dbCourses && dbCourses.map((course) => {
        return (
          <div key={course.id} className="d-flex my-3 w-100 justify-content-between">
            <h2>{course.name}</h2>
            {MyButton("button", "Verwijderen", () => deleteCourse(course.id))}
            {/* <Button onClick={() => deleteCourse(course.id)}>Verwijder</Button> */}
          </div>
        )
      })}

    </div>
  )
}
