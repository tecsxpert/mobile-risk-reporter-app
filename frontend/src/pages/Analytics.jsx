import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const Analytics = () => {

  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [lineData, setLineData] = useState([])
  const [loading, setLoading] = useState(true)

  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const PIE_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e']

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setLoading(true)

    API.get('/risks/analytics')
      .then(res => {
        const data = res.data || {}

        setBarData(data.barData || [])
        setPieData(data.pieData || [])
        setLineData(data.lineData || [])
      })
      .catch(err => {
        console.error("Analytics error:", err)
        setBarData([])
        setPieData([])
        setLineData([])
      })
      .finally(() => setLoading(false))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <h1
          onClick={() => navigate('/dashboard')}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Risk Reporter
        </h1>

        <div className="flex gap-3">
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 rounded-lg hover:bg-gray-100">
            Dashboard
          </button>
          <button onClick={() => navigate('/reports')} className="px-4 py-2 rounded-lg hover:bg-gray-100">
            Reports
          </button>
          <button onClick={logout} className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
            Logout
          </button>
        </div>

      </div>

      
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Analytics Dashboard
        </h2>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold mb-4">Risks by Severity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risks" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold mb-4">Risk Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h3 className="font-bold mb-4">Open vs Resolved Trends</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  )
}

export default Analytics