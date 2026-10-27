import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import type { Control, Path } from 'react-hook-form'
import type { Citizen } from '../types/citizen'
import type { FieldConfig } from '../types/form'

interface FormFieldProps {
  config: FieldConfig
  control: Control<Citizen>
}

function FormField({ config, control }: FormFieldProps) {
  const options = config.options ?? []

  return (
    <Controller
      name={config.name as Path<Citizen>}
      control={control}
      render={({ field }) => {
        const value = field.value as unknown

        switch (config.type) {
          case 'number':
            return (
              <TextField
                label={config.label}
                type="number"
                value={value ?? ''}
                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              />
            )

          case 'date':
            return (
              <TextField
                label={config.label}
                type="date"
                value={value ?? ''}
                onChange={field.onChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )

          case 'textarea':
            return (
              <TextField
                label={config.label}
                multiline
                minRows={2}
                value={value ?? ''}
                onChange={field.onChange}
              />
            )

          case 'select':
            return (
              <TextField select label={config.label} value={value ?? ''} onChange={field.onChange}>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )

          case 'multiselect':
            return (
              <TextField
                select
                label={config.label}
                value={(value as string[]) ?? []}
                onChange={field.onChange}
                slotProps={{
                  select: {
                    multiple: true,
                    renderValue: (selected) => (selected as string[]).join(', '),
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={((value as string[]) ?? []).includes(option)} size="small" />
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )

          case 'autocomplete':
            return (
              <Autocomplete
                options={options}
                value={(value as string) || null}
                onChange={(_, newValue) => field.onChange(newValue ?? '')}
                renderInput={(params) => <TextField {...params} label={config.label} />}
              />
            )

          case 'radio':
            return (
              <FormControl>
                <FormLabel sx={{ fontSize: 12 }}>{config.label}</FormLabel>
                <RadioGroup row value={value ?? ''} onChange={field.onChange}>
                  {options.map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio size="small" />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            )

          case 'checkbox':
            return (
              <FormControlLabel
                label={config.label}
                control={
                  <Checkbox checked={Boolean(value)} onChange={(e) => field.onChange(e.target.checked)} />
                }
              />
            )

          case 'switch':
            return (
              <FormControlLabel
                label={config.label}
                control={<Switch checked={Boolean(value)} onChange={(e) => field.onChange(e.target.checked)} />}
              />
            )

          default:
            return <TextField label={config.label} value={value ?? ''} onChange={field.onChange} />
        }
      }}
    />
  )
}

export default FormField
