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
      rules={{
        required: config.required ? 'Обязательное поле' : false,
        pattern: config.pattern
          ? { value: new RegExp(config.pattern.value), message: config.pattern.message }
          : undefined,
      }}
      render={({ field, fieldState }) => {
        const value = field.value as unknown
        const label = config.required ? `${config.label} *` : config.label
        const errorProps = { error: Boolean(fieldState.error), helperText: fieldState.error?.message }

        switch (config.type) {
          case 'number':
            return (
              <TextField
                label={label}
                {...errorProps}
                type="number"
                value={value ?? ''}
                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              />
            )

          case 'date':
            return (
              <TextField
                label={label}
                {...errorProps}
                type="date"
                value={value ?? ''}
                onChange={field.onChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )

          case 'textarea':
            return (
              <TextField
                label={label}
                {...errorProps}
                multiline
                minRows={2}
                value={value ?? ''}
                onChange={field.onChange}
              />
            )

          case 'select':
            return (
              <TextField select label={label} value={value ?? ''} onChange={field.onChange} {...errorProps}>
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
                label={label}
                {...errorProps}
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
                renderInput={(params) => <TextField {...params} label={label} />}
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
                label={label}
                control={
                  <Checkbox checked={Boolean(value)} onChange={(e) => field.onChange(e.target.checked)} />
                }
              />
            )

          case 'switch':
            return (
              <FormControlLabel
                label={label}
                control={<Switch checked={Boolean(value)} onChange={(e) => field.onChange(e.target.checked)} />}
              />
            )

          default:
            return <TextField label={label} value={value ?? ''} onChange={field.onChange} {...errorProps} />
        }
      }}
    />
  )
}

export default FormField
