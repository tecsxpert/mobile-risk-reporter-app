import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const RiskList = () => {

  const [reports, setReports]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [empty, setEmpty]           = useState(false)
  const [page, setPage]             = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch]         = useState('')
  const [status, setStatus]         = useState('')
  const [fromDate, setFromDate]     = useState('')
  const [toDate, setToDate]         = useState('')

  const { logout } = useContext(AuthContext)
  const navigate   = useNavigate()

  useEffect(() => {
  fetchReports()
}, [search, status, fromDate, toDate, page])

  const fetchReports = () => {
    setLoading(true)
    API.get('/risks/all', {
      params: {
        page:   page,
        size:   10,
        q:      search,
        status: status,
        from:   fromDate,
        to:     toDate
      }
    })
      .then(res => {
        const data = res.data.content || res.data
        setReports(data)
        setTotalPages(res.data.totalPages || 1)
        setEmpty(data.length === 0)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  const handleDelete = (id) => {
    if(window.confirm('Delete this report?')) {
      API.delete(`/risks/${id}`)
        .then(() => {
          setReports(reports.filter(r => r.id !== id))
        })
        .catch(err => console.error(err))
    }
  }

  const severityBadge = (severity) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-700 border border-red-300'
      case 'HIGH':     return 'bg-orange-100 text-orange-700 border border-orange-300'
      case 'MEDIUM':   return 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      default:         return 'bg-green-100 text-green-700 border border-green-300'
    }
  }

  const statusBadge = (status) => {
    switch(status) {
      case 'OPEN':      return 'bg-blue-100 text-blue-700 border border-blue-300'
      case 'IN_REVIEW': return 'bg-purple-100 text-purple-700 border border-purple-300'
      case 'RESOLVED':  return 'bg-green-100 text-green-700 border border-green-300'
      default:          return 'bg-gray-100 text-gray-700 border border-gray-300'
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
            className="text-gray-600 px-4 py-2 rounded-lg
                       hover:bg-gray-100 font-medium"
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
      
      <div className="p-6 max-w-7xl mx-auto">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      All Risk Reports
    </h2>
    <p className="text-gray-500 text-sm mt-1">
      Manage and track all reported workplace risks
    </p>
  </div>

  
  <SearchBar
    onSearch={(value) => {
      setPage(0)
      setSearch(value)
    }}
    onStatusChange={(value) => {
      setPage(0)
      setStatus(value)
    }}
    onDateChange={(from, to) => {
      setPage(0)
      setFromDate(from)
      setToDate(to)
    }}
  />

  
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600
                              border-t-transparent rounded-full
                              animate-spin mx-auto mb-3"/>
              <p className="text-gray-500">Loading reports...</p>
            </div>
          </div>
        )}

       
        {!loading && empty && (
          <div className="bg-white rounded-2xl shadow-sm p-12
                          text-center">
            <p className="text-6xl mb-4">📋</p>
            <p className="text-gray-700 text-xl font-bold mb-2">
              No reports found!
            </p>
            <p className="text-gray-400 mb-6">
              Try different search or filters
            </p>
            <button
              onClick={() => navigate('/create')}
              className="bg-blue-600 text-white px-6 py-3
                         rounded-xl hover:bg-blue-700 font-medium"
            >
              + Report First Risk
            </button>
          </div>
        )}

        
        {!loading && !empty && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100
                            flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                Showing {reports.length} reports
              </p>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">#</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Title</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Severity</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Status</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Location</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Reported By</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Date</th>
                  <th className="p-4 text-left text-gray-500
                                 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reports.map((report, index) => (
                  <tr key={report.id}
                      className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-400 text-sm">
                      {page * 10 + index + 1}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-800">
                        {report.title}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full
                                        text-xs font-bold
                                        ${severityBadge(report.severity)}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full
                                        text-xs font-bold
                                        ${statusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {report.location || '-'}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {report.reportedBy}
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(report.createdAt)
                        .toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/detail/${report.id}`)}
                          className="bg-blue-50 text-blue-600
                                     px-3 py-1.5 rounded-lg text-sm
                                     hover:bg-blue-100 font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/edit/${report.id}`)}
                          className="bg-gray-50 text-gray-600
                                     px-3 py-1.5 rounded-lg text-sm
                                     hover:bg-gray-100 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="bg-red-50 text-red-500
                                     px-3 py-1.5 rounded-lg text-sm
                                     hover:bg-red-100 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            <div className="flex justify-between items-center p-4
                            border-t border-gray-100">
              <p className="text-gray-400 text-sm">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 bg-white border-2 border-gray-200
                             text-gray-600 rounded-lg font-medium
                             disabled:opacity-40 hover:bg-gray-50"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 bg-blue-600 text-white
                             rounded-lg font-medium
                             disabled:opacity-40 hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default RiskList