import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import type { CitizenCardData } from '../api/citizensApi'
import { sections } from '../config/sections'
import type { Citizen } from '../types/citizen'
import { formatDate } from '../utils/date'
import FormField from './FormField'
import StatusChip from './StatusChip'

function CitizenCardForm({ data }: { data: CitizenCardData }) {
  const { citizen } = data
  const { control } = useForm<Citizen>({ defaultValues: citizen })
  const [tab, setTab] = useState(0)
  const section = sections[tab]

  return (
    <Box>
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
          {section.groups.map((group) => (
            <Box key={group.title} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {group.title}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                {group.fields.map((field) => (
                  <Box key={field.name} sx={{ gridColumn: field.type === 'textarea' ? '1 / -1' : undefined }}>
                    <FormField config={field} control={control} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default CitizenCardForm
