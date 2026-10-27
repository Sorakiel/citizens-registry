import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import CitizenCardForm from '../components/CitizenCardForm'
import { useCitizen } from '../hooks/useCitizen'

function CitizenCard() {
  const { id } = useParams()
  const { data, loading } = useCitizen(Number(id))

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return <Typography variant="h6">Гражданин не найден</Typography>
  }

  return <CitizenCardForm key={data.citizen.id} data={data} />
}

export default CitizenCard
