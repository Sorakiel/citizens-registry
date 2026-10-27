import { useState } from 'react'
import type { FormEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { emptyFilters } from '../api/citizensApi'
import { categories, districts, genders, statuses } from '../config/dictionaries'
import type { CitizenFilters } from '../types/citizen'

interface FilterSelectProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <TextField select label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      <MenuItem value="">Все</MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

interface CitizensFiltersProps {
  onApply: (filters: CitizenFilters) => void
}

function CitizensFilters({ onApply }: CitizensFiltersProps) {
  const [draft, setDraft] = useState<CitizenFilters>(emptyFilters)

  function change(changes: Partial<CitizenFilters>) {
    setDraft({ ...draft, ...changes })
  }

  function toNumber(value: string) {
    return value === '' ? null : Number(value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onApply(draft)
  }

  function handleReset() {
    setDraft(emptyFilters)
    onApply(emptyFilters)
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        <TextField
          label="Поиск по ФИО"
          value={draft.search}
          onChange={(e) => change({ search: e.target.value })}
          sx={{ gridColumn: { md: 'span 2' } }}
        />
        <FilterSelect
          label="Пол"
          value={draft.gender}
          options={genders}
          onChange={(gender) => change({ gender })}
        />
        <FilterSelect
          label="Статус"
          value={draft.status}
          options={statuses}
          onChange={(status) => change({ status })}
        />
        <FilterSelect
          label="Район"
          value={draft.district}
          options={districts}
          onChange={(district) => change({ district })}
        />
        <FilterSelect
          label="Категория"
          value={draft.category}
          options={categories}
          onChange={(category) => change({ category })}
        />
        <TextField
          label="Возраст от"
          type="number"
          value={draft.ageFrom ?? ''}
          onChange={(e) => change({ ageFrom: toNumber(e.target.value) })}
        />
        <TextField
          label="Возраст до"
          type="number"
          value={draft.ageTo ?? ''}
          onChange={(e) => change({ ageTo: toNumber(e.target.value) })}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button type="submit" variant="contained">
          Применить
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Сбросить
        </Button>
      </Box>
    </Paper>
  )
}

export default CitizensFilters
