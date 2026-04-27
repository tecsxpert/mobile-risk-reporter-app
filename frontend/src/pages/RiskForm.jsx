import { useState } from 'react'
import API from '../services/api'

const RiskForm = ({ existing = null }) => {

  const [form, setForm] = useState({
    title:       existing?.title       || '',
    description: existing?.description || '',
    severity:    existing?.severity    || 'LOW',
    location:    existing?.location    || '',
    reportedBy:  existing?.reportedBy  || ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const err = {}
    if(!form.title)      err.title      = 'Title is required'
    if(!form.severity)   err.severity   = 'Severity is required'
    if(!form.reportedBy) err.reportedBy = 'Reporter name is required'
    return err
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = () => {
    const err = validate()
    if(Object.keys(err).length > 0) {
      setErrors(err)
      return
    }
    setLoading(true)
    if(existing) {
      API.put(`/risks/${existing.id}`, form)
        .then(() => setSuccess(true))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    } else {
      API.post('/risks', form)
        .then(() => setSuccess(true))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }

  const severityColors = {
    LOW:      'bg-green-100 text-green-700 border-green-300',
    MEDIUM:   'bg-yellow-100 text-yellow-700 border-yellow-300',
    HIGH:     'bg-orange-100 text-orange-700 border-orange-300',
    CRITICAL: 'bg-red-100 text-red-700 border-red-300',
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">

        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {existing ? 'Edit Report' : 'Report a Risk'}
          </h1>
          <p className="text-gray-500 mt-1">
            {existing 
              ? 'Update the risk report details below'
              : 'Fill in the details to report a workplace risk'}
          </p>
        </div>

        
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 
                          rounded-lg text-green-700 font-medium">
            Report {existing ? 'updated' : 'created'} successfully!
          </div>
        )}

        
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border-2 p-3 rounded-lg outline-none
              focus:border-blue-500 transition
              ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
            placeholder="e.g. Broken fire extinguisher "
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
               {errors.title}
            </p>
          )}
        </div>

        
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 p-3 rounded-lg 
                       outline-none focus:border-blue-500 transition"
            placeholder="Describe the risk in detail..."
            rows={3}
          />
        </div>

        
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-700">
            Severity <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(level => (
              <button
                key={level}
                onClick={() => setForm({...form, severity: level})}
                className={`p-2 rounded-lg border-2 font-semibold text-sm
                  transition cursor-pointer
                  ${form.severity === level 
                    ? severityColors[level] + ' border-2' 
                    : 'bg-gray-50 text-gray-500 border-gray-200'}`}
              >
                {level}
              </button>
            ))}
          </div>
          {errors.severity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.severity}
            </p>
          )}
        </div>

        
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-gray-700">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 p-3 rounded-lg 
                       outline-none focus:border-blue-500 transition"
            placeholder="e.g. Floor 2, Warehouse B"
          />
        </div>

        
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">
            Reported By <span className="text-red-500">*</span>
          </label>
          <input
            name="reportedBy"
            value={form.reportedBy}
            onChange={handleChange}
            className={`w-full border-2 p-3 rounded-lg outline-none
              focus:border-blue-500 transition
              ${errors.reportedBy ? 'border-red-400' : 'border-gray-200'}`}
            placeholder="Your full name"
          />
          {errors.reportedBy && (
            <p className="text-red-500 text-sm mt-1">
              {errors.reportedBy}
            </p>
          )}
        </div>

        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-bold text-white
            transition text-lg
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
        >
          {loading 
            ? 'Submitting...' 
            : existing 
              ? 'Update Report' 
              : 'Submit Report'}
        </button>

      </div>
    </div>
  )
}

export default RiskForm
