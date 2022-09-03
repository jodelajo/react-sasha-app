import { Container } from "react-bootstrap";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../../routes/PrivateRoute";
import ForgotPassword from "../auth/ForgotPassword";
import UpdateProfile from "../auth/UpdateProfile";
import Profile from '../auth/Profile'
import Courses from "../courses/Courses";
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
             <Route path="/courses" element={<Courses />} />
             <Route path="/profile" element={<Profile />} />
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
