import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const Dashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    high: 0,
    resolved: 0
  })

  const [chartData, setChartData] = useState([])
  const [recentReports, setRecentReports] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

 useEffect(() => {

 
  API.get('/risks/stats')
    .then(res => setStats(res.data))
    .catch(err => console.error(err))

  
  API.get('/risks/weekly')
    .then(res => setChartData(res.data))
    .catch(() => setChartData([])) 

  
  API.get('/risks')
    .then(res => setRecentReports(res.data.slice(0,5)))
    .catch(() => setRecentReports([])) 

  setLoading(false)

}, [])

  const severityColor = (severity) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-red-600'
      case 'HIGH':     return 'bg-orange-500'
      case 'MEDIUM':   return 'bg-yellow-500'
      default:         return 'bg-green-500'
    }
  }

  const statusColor = (status) => {
    switch(status) {
      case 'OPEN':      return 'bg-blue-500'
      case 'IN_REVIEW': return 'bg-yellow-500'
      case 'RESOLVED':  return 'bg-green-500'
      default:          return 'bg-gray-400'
    }
  }

  const scoreColor = (score) => {
    if(score >= 75) return 'text-red-600 bg-red-50'
    if(score >= 50) return 'text-orange-600 bg-orange-50'
    if(score >= 25) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const kpiCards = [
    {
      title: 'Total Reports',
      value: stats.total,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      title: 'Open Risks',
      value: stats.open,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-600'
    },
    {
      title: 'High Priority',
      value: stats.high,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-600'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-600'
    }
  ]

  if(loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-600
                      border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm px-4 py-4
                flex flex-col md:flex-row
                gap-4 md:gap-0
                justify-between md:items-center">
      
        <h1 className="text-2xl font-bold text-blue-600">
          Risk Reporter
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/reports')}
            className="bg-gray-50 text-gray-600 px-4 py-2
                       rounded-lg hover:bg-gray-100 font-medium"
          >
            All Reports
          </button>
          <button
  onClick={() => navigate('/analytics')}
  className="text-gray-600 px-4 py-2 rounded-lg
             hover:bg-gray-100 font-medium"
>
  Analytics
</button>
          <button
            onClick={() => navigate('/create')}
            className="bg-blue-600 text-white px-4 py-2
                       rounded-lg hover:bg-blue-700 font-medium"
          >
            + Report Risk
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
     
      <div className="p-4 md:p-6">
       {/* KPI Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  {kpiCards.map((card, index) => (
    <div key={index}
         className={`bg-white rounded-xl border-2 p-4 md:p-5
                     shadow-sm ${card.color}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs md:text-sm font-medium">
            {card.title}
          </p>
          <p className={`text-3xl md:text-4xl font-bold mt-1 
                         ${card.textColor}`}>
            {card.value}
          </p>
        </div>
        <span className="text-2xl md:text-3xl">{card.icon}</span>
      </div>
    </div>
  ))}
</div>
        </div>

       
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Risks Reported This Week
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="risks" fill="#3b82f6" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Recent Reports
            </h2>
            <button
              onClick={() => navigate('/reports')}
              className="text-blue-600 text-sm hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left text-gray-600 font-semibold">Title</th>
                <th className="p-3 text-left text-gray-600 font-semibold">Severity</th>
                <th className="p-3 text-left text-gray-600 font-semibold">Status</th>
                <th className="p-3 text-left text-gray-600 font-semibold">Score</th>
                <th className="p-3 text-left text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map(report => (
                <tr key={report.id}
                    className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">
                    {report.title}
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white
                                      text-xs font-semibold
                                      ${severityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white
                                      text-xs font-semibold
                                      ${statusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-lg font-bold
                                      text-sm ${scoreColor(report.score)}`}>
                      {report.score}/10
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/detail/${report.id}`)}
                        className="bg-blue-50 text-blue-600 px-3 py-1
                                   rounded-lg text-sm hover:bg-blue-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit/${report.id}`)}
                        className="bg-gray-50 text-gray-600 px-3 py-1
                                   rounded-lg text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        

      </div>
    </div>
  )
}

export default Dashboard