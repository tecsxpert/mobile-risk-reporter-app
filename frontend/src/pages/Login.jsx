import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if(!form.email || !form.password) {
      setError('Email and password are required!')
      return
    }
    setLoading(true)
    API.post('/auth/login', form)
      .then(res => {
        login(res.data.token)
      })
      .catch(() => {
        setError('Invalid email or password!')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-gray-50 
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
             Risk Reporter
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 
                          rounded-lg text-red-600 text-sm">
            ⚠️ {error}
          </div>
        )}

        
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 p-3 
                       rounded-lg outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 p-3 
                       rounded-lg outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-bold text-white
            text-lg transition
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Signing in...' : ' Sign In'}
        </button>

      </div>
    </div>
  )
}

export default Login