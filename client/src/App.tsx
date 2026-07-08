import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './features/auth/pages/LoginPage'
import { SignupPage } from './features/auth/pages/SignupPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { AuthProvider } from './features/auth/AuthContext'
import { ProtectedRoute } from './features/auth/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
