import { Container } from "react-bootstrap";
import Signup from "../Signup";
import styles from './App.module.css'
import { AuthProvider } from '../../contexts/AuthContext'


function App() {
  return (
    <AuthProvider>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App;
