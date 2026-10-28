import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import type { Path } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createCitizen } from '../api/citizensApi'
import SectionFields from '../components/SectionFields'
import { getAllFields, sections } from '../config/sections'
import { summaryFields, wizardSteps } from '../config/wizard'
import type { Citizen } from '../types/citizen'
import { getFieldText } from '../utils/fields'

const emptyCitizen: Citizen = {
  id: 0,
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  gender: 'Мужской',
  snils: '',
  inn: '',
  phone: '',
  email: '',
  district: '',
  city: '',
  address: '',
  status: 'Активен',
  category: '',
  maritalStatus: '',
  citizenship: 'Российская Федерация',
  registrationDate: new Date().toISOString().slice(0, 10),
  details: {},
}

function CitizenNew() {
  const navigate = useNavigate()
  const { control, handleSubmit, trigger, watch } = useForm<Citizen>({ defaultValues: emptyCitizen })
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const isLastStep = step === wizardSteps.length
  const values = watch()

  async function handleNext() {
    // проверяем только поля текущего шага
    const stepSections = sections.filter((item) => wizardSteps[step].sectionIds.includes(item.id))
    const names = stepSections.flatMap((item) =>
      item.groups.flatMap((group) => group.fields.map((field) => field.name)),
    )
    const isValid = await trigger(names as Path<Citizen>[])

    if (isValid) {
      setStep(step + 1)
    }
  }

  async function onSubmit(data: Citizen) {
    setSaving(true)
    const citizen = await createCitizen(data)
    navigate(`/citizens/${citizen.id}`)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Новая запись
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {[...wizardSteps.map((item) => item.title), 'Проверка'].map((title) => (
            <Step key={title}>
              <StepLabel>{title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {!isLastStep &&
          sections
            .filter((item) => wizardSteps[step].sectionIds.includes(item.id))
            .map((item) => <SectionFields key={item.id} section={item} control={control} />)}

        {isLastStep && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Проверьте данные
            </Typography>
            {summaryFields.map((name) => {
              const field = getAllFields().find((item) => item.name === name)
              if (!field) {
                return null
              }
              return (
                <Box
                  key={name}
                  sx={{ display: 'flex', py: 0.75, borderBottom: '1px solid #edf0f3', maxWidth: 600 }}
                >
                  <Typography color="text.secondary" sx={{ width: 220 }}>
                    {field.label}
                  </Typography>
                  <Typography>{getFieldText(values, field)}</Typography>
                </Box>
              )
            })}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
            Назад
          </Button>
          {isLastStep ? (
            <Button key="submit" type="submit" variant="contained" disabled={saving}>
              {saving ? 'Создание...' : 'Создать запись'}
            </Button>
          ) : (
            <Button key="next" variant="contained" onClick={handleNext}>
              Далее
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default CitizenNew
