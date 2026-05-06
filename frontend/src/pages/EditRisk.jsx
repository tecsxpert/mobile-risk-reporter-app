import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import RiskForm from './RiskForm'

const EditRisk = () => {

  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    API.get(`/risks/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!data) return <p>Loading...</p>

  return <RiskForm existing={data} />
}

export default EditRisk