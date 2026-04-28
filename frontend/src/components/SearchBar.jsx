import { useEffect, useState } from 'react'

const SearchBar = ({ onSearch, onStatusChange, onDateChange }) => {

  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate]   = useState('')

  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">

        
        <div className="col-span-2">
          <label className="block text-sm font-medium 
                            text-gray-600 mb-1">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full border-2 border-gray-200 p-2 
                       rounded-lg outline-none 
                       focus:border-blue-500"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium 
                            text-gray-600 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={e => {
              setStatus(e.target.value)
              onStatusChange(e.target.value)
            }}
            className="w-full border-2 border-gray-200 p-2 
                       rounded-lg outline-none 
                       focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearch('')
              setStatus('')
              setFromDate('')
              setToDate('')
              onSearch('')
              onStatusChange('')
              onDateChange('', '')
            }}
            className="w-full bg-gray-100 text-gray-600 
                       p-2 rounded-lg hover:bg-gray-200 
                       font-medium"
          >
            Clear Filters
          </button>
        </div>

        
        <div>
          <label className="block text-sm font-medium 
                            text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={e => {
              setFromDate(e.target.value)
              onDateChange(e.target.value, toDate)
            }}
            className="w-full border-2 border-gray-200 p-2 
                       rounded-lg outline-none 
                       focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium 
                            text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={e => {
              setToDate(e.target.value)
              onDateChange(fromDate, e.target.value)
            }}
            className="w-full border-2 border-gray-200 p-2 
                       rounded-lg outline-none 
                       focus:border-blue-500"
          />
        </div>

      </div>
    </div>
  )
}

export default SearchBar