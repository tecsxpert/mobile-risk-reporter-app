import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import RiskDetail from './pages/RiskDetail'
import RiskForm from './pages/RiskForm'
import RiskList from './pages/RiskList'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />

                    <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

          <Route path="/reports" element={
            <ProtectedRoute>
              <RiskList />
            </ProtectedRoute>
          }/>
          <Route path="/analytics" element={
  <ProtectedRoute>
    <Analytics />
  </ProtectedRoute>
}/>
          <Route path="/create" element={
            <ProtectedRoute>
              <RiskForm />
            </ProtectedRoute>
          }/>

          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <RiskForm />
            </ProtectedRoute>
          }/>

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

          <Route path="/detail/:id" element={
            <ProtectedRoute>
              <RiskDetail />
            </ProtectedRoute>
          }/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

