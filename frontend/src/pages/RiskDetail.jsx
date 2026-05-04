import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'

const RiskDetail = () => {

  const { id }     = useParams()
  const navigate   = useNavigate()
  const [report, setReport]   = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {

  setLoading(true)

  API.get(`/risks/${id}`)
    .then(async (res) => {

      const riskData = res.data

      try {

        const aiRes = await API.post('/ai/recommend', {
          user_input: `
            Title: ${riskData.title}
            Description: ${riskData.description}
            Severity: ${riskData.severity}
          `
        })

        riskData.aiRecommendations =
          aiRes.data.recommendations?.join(', ')

        riskData.aiDescription =
          `Priority: ${aiRes.data.priority}`

      } catch(err) {
        console.error('AI API Error', err)
      }

      setReport(riskData)

    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

}, [id])

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this report?')) {
      API.delete(`/risks/${id}`)
        .then(() => navigate('/reports'))
        .catch(err => console.error(err))
    }
  }

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
    if(score >= 75) return 'text-red-600 bg-red-50 border-red-200'
    if(score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200'
    if(score >= 25) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  if(loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-600
                      border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  if(!report) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-lg">Report not found!</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-4 md:px-6 py-4
                flex flex-col md:flex-row
                justify-between items-start md:items-center gap-3">

  <h1 className="text-2xl font-bold text-blue-600">
    Risk Reporter
  </h1>

  <button
    onClick={() => navigate(-1)}
    className="bg-gray-50 text-gray-600 px-4 py-2
               rounded-lg hover:bg-gray-100 font-medium"
  >
    ← Back
  </button>

</div>

      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {report.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Reported on {new Date(report.createdAt)
                  .toLocaleDateString()}
              </p>
            </div>

            
            <span className={`px-4 py-2 rounded-xl border-2
                              font-bold text-lg 
                              ${scoreColor(report.score || 0)}`}>
              Score: {report.score || 'N/A'}/100
            </span>
          </div>

          
          <div className="flex gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-white
                              text-sm font-semibold
                              ${severityColor(report.severity)}`}>
              {report.severity}
            </span>
            <span className={`px-3 py-1 rounded-full text-white
                              text-sm font-semibold
                              ${statusColor(report.status)}`}>
              {report.status}
            </span>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-semibold text-gray-800 mt-1">
                {report.location || 'Not specified'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Reported By</p>
              <p className="font-semibold text-gray-800 mt-1">
                {report.reportedBy}
              </p>
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-500 text-sm mb-1">
              Description
            </p>
            <p className="text-gray-800">
              {report.description || 'No description provided'}
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/edit/${report.id}`)}
              className="bg-blue-600 text-white px-6 py-2
                         rounded-lg hover:bg-blue-700 font-medium"
            >
              Edit Report
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-600 px-6 py-2
                         rounded-lg hover:bg-red-100 font-medium"
            >
              Delete Report
            </button>
          </div>
        </div>

        
        <div className="bg-blue-50 rounded-xl border-2 
                        border-blue-200 p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">
             AI Analysis
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white rounded-lg p-4 border 
                            border-blue-100">
              <p className="text-blue-600 font-semibold text-sm mb-1">
                AI Description
              </p>
              <p className="text-gray-400 text-sm">
                {report.aiDescription || 
                  'AI analysis will appear here...'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border 
                            border-blue-100">
              <p className="text-blue-600 font-semibold text-sm mb-1">
                AI Recommendations
              </p>
              <p className="text-gray-400 text-sm">
                {report.aiRecommendations || 
                  'AI recommendations will appear here...'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RiskDetail