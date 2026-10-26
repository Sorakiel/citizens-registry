import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'

function CitizenCard() {
  const { id } = useParams()

  return <Typography variant="h5">Карточка гражданина {id}</Typography>
}

export default CitizenCard
