import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell, Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const Analytics = () => {

  const [period, setPeriod]         = useState('week')
  const [barData, setBarData]       = useState([])
  const [pieData, setPieData]       = useState([])
  const [lineData, setLineData]     = useState([])
  const [loading, setLoading]       = useState(true)
  const { logout }                  = useContext(AuthContext)
  const navigate                    = useNavigate()

  const PIE_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e']

  useEffect(() => {
    loadData()
  }, [period])

  const loadData = () => {
    setLoading(true)
  
     API.get('/risks/analytics', { params: { period } })
    .then(res => {
        setBarData(res.data.barData)
         setPieData(res.data.pieData)
        setLineData(res.data.lineData)
      })
      .catch(err => console.error(err))
       .finally(() => setLoading(false))
  }

  if(loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-600
                      border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm px-4 md:px-6 py-4
                flex flex-col md:flex-row
                justify-between items-start md:items-center gap-3">

  <h1
    onClick={() => navigate('/dashboard')}
    className="text-2xl font-bold text-blue-600 cursor-pointer"
  >
    Risk Reporter
  </h1>

  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => navigate('/dashboard')}
      className="text-gray-600 px-4 py-2 rounded-lg
                 hover:bg-gray-100 font-medium"
    >
      Dashboard
    </button>

    <button
      onClick={() => navigate('/reports')}
      className="text-gray-600 px-4 py-2 rounded-lg
                 hover:bg-gray-100 font-medium"
    >
      Reports
    </button>

    <button
      onClick={logout}
      className="bg-red-50 text-red-600 px-4 py-2
                 rounded-lg hover:bg-red-100 font-medium"
    >
      Logout
    </button>
  </div>
</div>

      <div className="p-6 max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
               Analytics
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Risk trends and statistics
            </p>
          </div>

          
          <div className="flex gap-2 bg-white rounded-xl
                          shadow-sm p-1">
            {['week', 'month', 'year'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg font-medium
                            text-sm transition capitalize
                            ${period === p
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {p === 'week'  && ' Week'}
                {p === 'month' && 'Month'}
                {p === 'year'  && 'Year'}
              </button>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">
               Risks Reported
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3"
                               stroke="#f0f0f0"/>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risks" fill="#3b82f6"
                     radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">
               Risk Status Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">
             Open vs Resolved Trends
          </h3>
         <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3"
                             stroke="#f0f0f0"/>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="open"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default Analytics