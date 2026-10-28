import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useForm } from 'react-hook-form'
import type { FieldErrors } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { saveCitizen } from '../api/citizensApi'
import type { CitizenCardData } from '../api/citizensApi'
import { sections } from '../config/sections'
import type { Citizen } from '../types/citizen'
import { formatDate } from '../utils/date'
import RelatedTable from './RelatedTable'
import SectionFields from './SectionFields'
import StatusChip from './StatusChip'

type Message = { text: string; severity: 'success' | 'error' }

function CitizenCardForm({ data }: { data: CitizenCardData }) {
  const { related } = data
  // данные для шапки, обновляются после сохранения
  const [citizen, setCitizen] = useState(data.citizen)
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<Citizen>({ defaultValues: citizen })
  const [tab, setTab] = useState(0)
  const [message, setMessage] = useState<Message | null>(null)
  const section = sections[tab]

  async function onSubmit(values: Citizen) {
    await saveCitizen(values)
    // после сохранения новые значения становятся исходными
    reset(values)
    setCitizen(values)
    setMessage({ text: 'Изменения сохранены', severity: 'success' })
  }

  // Переходим на вкладку, где есть ошибка
  function onInvalid(errors: FieldErrors<Citizen>) {
    const names = Object.keys(errors)
    const index = sections.findIndex((item) =>
      item.groups.some((group) => group.fields.some((field) => names.includes(field.name))),
    )
    if (index !== -1) {
      setTab(index)
    }
    setMessage({ text: 'Проверьте заполнение обязательных полей', severity: 'error' })
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
          {citizen.lastName[0]}
          {citizen.firstName[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            {citizen.lastName} {citizen.firstName} {citizen.middleName}
          </Typography>
          <Typography color="text.secondary">
            Дата рождения: {formatDate(citizen.birthDate)} · СНИЛС: {citizen.snils} · {citizen.district} район
          </Typography>
        </Box>
        <StatusChip status={citizen.status} />
        <Button component={Link} to="/citizens" startIcon={<ArrowBackIcon />} variant="outlined">
          К списку
        </Button>
        <Button variant="outlined" disabled={!isDirty} onClick={() => reset()}>
          Отменить
        </Button>
        <Button type="submit" variant="contained" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </Paper>

      <Paper>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: '1px solid #dfe4ea' }}
        >
          {sections.map((item) => (
            <Tab key={item.id} label={item.title} />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          <SectionFields section={section} control={control} />

          {section.related && <RelatedTable tableKey={section.related} rows={related[section.related]} />}
        </Box>
      </Paper>

      <Snackbar
        open={message !== null}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={message?.severity ?? 'success'} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CitizenCardForm
