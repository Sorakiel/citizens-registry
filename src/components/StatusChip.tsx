import Chip from '@mui/material/Chip'
import type { CitizenStatus } from '../types/citizen'

const colors: Record<CitizenStatus, 'success' | 'warning' | 'default'> = {
  'Активен': 'success',
  'Приостановлен': 'warning',
  'Снят с учёта': 'default',
}

function StatusChip({ status }: { status: CitizenStatus }) {
  return <Chip label={status} color={colors[status]} size="small" variant="outlined" />
}

export default StatusChip
