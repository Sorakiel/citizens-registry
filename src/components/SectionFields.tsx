import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Control } from 'react-hook-form'
import type { Citizen } from '../types/citizen'
import type { SectionConfig } from '../types/form'
import FormField from './FormField'

interface SectionFieldsProps {
  section: SectionConfig
  control: Control<Citizen>
}

// Поля раздела, сгруппированные по блокам
function SectionFields({ section, control }: SectionFieldsProps) {
  return (
    <>
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
    </>
  )
}

export default SectionFields
