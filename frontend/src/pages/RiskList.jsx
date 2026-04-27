import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const RiskList = () => {

  const [reports, setReports]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [empty, setEmpty]         = useState(false)
  const [page, setPage]           = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const { logout } = useContext(AuthContext)
  const navigate   = useNavigate()

  useEffect(() => {
    setLoading(true)
    API.get(`/risks/all?page=${page}&size=10`)
      .then(res => {
        
        const data = res.data.content || res.data
        setReports(data)
        setTotalPages(res.data.totalPages || 1)
        if(data.length === 0) setEmpty(true)
        else setEmpty(false)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [page])

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this report?')) {
      API.delete(`/risks/${id}`)
        .then(() => {
          setReports(reports.filter(r => r.id !== id))
        })
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

  return (
    <div className="min-h-screen bg-gray-50">
      
<div className="bg-white shadow-sm px-6 py-4
                flex justify-between items-center">
  <h1 
    onClick={() => navigate('/dashboard')}
    className="text-2xl font-bold text-blue-600 cursor-pointer"
  >
    Risk Reporter
  </h1>
  <div className="flex gap-3">
    <button
      onClick={() => navigate('/dashboard')}
      className="bg-gray-50 text-gray-600 px-4 py-2
                 rounded-lg hover:bg-gray-100 font-medium"
    >
      Dashboard
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

      <div className="p-6">

        
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              All Risk Reports
            </h2>
            <p className="text-gray-500 text-sm">
              Showing page {page + 1} of {totalPages}
            </p>
          </div>
        </div>

        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-blue-600 
                              border-t-transparent rounded-full 
                              animate-spin mx-auto mb-3"/>
              <p className="text-gray-500">Loading reports...</p>
            </div>
          </div>
        )}

        
        {!loading && empty && (
          <div className="flex flex-col justify-center 
                          items-center h-64 text-center">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-gray-500 text-lg font-medium">
              No reports found!
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Click "Report Risk" to add your first report
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !empty && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left text-gray-600 font-semibold">#</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Title</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Severity</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Status</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Location</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Reported By</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Date</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report.id} 
                      className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-500">
                      {page * 10 + index + 1}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {report.title}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-white 
                                        text-xs font-semibold
                                        ${severityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-white 
                                        text-xs font-semibold
                                        ${statusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {report.location || '-'}
                    </td>
                    <td className="p-4 text-gray-600">
                      {report.reportedBy}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/edit/${report.id}`)}
                          className="bg-blue-50 text-blue-600 px-3 py-1 
                                     rounded-lg text-sm hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="bg-red-50 text-red-600 px-3 py-1 
                                     rounded-lg text-sm hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            <div className="flex justify-center items-center gap-3 p-4">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                           disabled:bg-gray-200 disabled:text-gray-400
                           hover:bg-blue-700 font-medium"
              >
                ← Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                           disabled:bg-gray-200 disabled:text-gray-400
                           hover:bg-blue-700 font-medium"
              >
                Next →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default RiskList