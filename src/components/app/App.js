import { Container } from "react-bootstrap";
import Signup from "../Signup";
import Login from "../Login";
import Dashboard from "../Dashboard";
import PrivateRoute from "../../routes/PrivateRoute";
import ForgotPassword from "../ForgotPassword";
import UpdateProfile from "../UpdateProfile";
import styles from './App.module.css'
import { AuthProvider } from '../../contexts/AuthContext'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <AuthProvider>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          <Routes>
            <Route
            exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
    </AuthProvider>

  )
}

export default App;
