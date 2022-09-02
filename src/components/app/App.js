import { Container } from "react-bootstrap";
import Signup from "../Signup";
import styles from './App.module.css'
import { AuthProvider } from '../../contexts/AuthContext'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <AuthProvider>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          <Routes>
          <Route path="/" element={<Signup />} />
          </Routes>
        </div>
      </Container>
    </AuthProvider>

  )
}

export default App;
