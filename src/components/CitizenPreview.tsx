import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { sections } from '../config/sections'
import { useCitizen } from '../hooks/useCitizen'
import { getFieldText } from '../utils/fields'
import RelatedTable from './RelatedTable'
import StatusChip from './StatusChip'

function CitizenPreview({ id }: { id: number }) {
  const { data, loading } = useCitizen(id)
  const [tab, setTab] = useState(0)
  const section = sections[tab]

  if (loading || !data) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={28} />
      </Paper>
    )
  }

  const { citizen, related } = data

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #dfe4ea' }}>
        <Typography variant="h6">
          {citizen.lastName} {citizen.firstName} {citizen.middleName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <StatusChip status={citizen.status} />
          <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
            {citizen.category}
          </Typography>
          <Button component={Link} to={`/citizens/${citizen.id}`} size="small" variant="contained">
            Открыть карточку
          </Button>
        </Box>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: '1px solid #dfe4ea', minHeight: 40 }}
      >
        {sections.map((item) => (
          <Tab key={item.id} label={item.title} sx={{ minHeight: 40 }} />
        ))}
      </Tabs>

      <Box sx={{ p: 2, overflow: 'auto', flexGrow: 1 }}>
        {section.groups.map((group) => (
          <Box key={group.title} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>{group.title}</Typography>
            {group.fields.map((field) => (
              <Box
                key={field.name}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  py: 0.5,
                  borderBottom: '1px solid #edf0f3',
                }}
              >
                <Typography color="text.secondary">{field.label}</Typography>
                <Typography sx={{ textAlign: 'right' }}>{getFieldText(citizen, field)}</Typography>
              </Box>
            ))}
          </Box>
        ))}

        {section.related && <RelatedTable tableKey={section.related} rows={related[section.related]} />}
      </Box>
    </Paper>
  )
}

export default CitizenPreview
