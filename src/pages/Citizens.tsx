import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { emptyFilters } from '../api/citizensApi'
import CitizenPreview from '../components/CitizenPreview'
import CitizensFilters from '../components/CitizensFilters'
import StatusChip from '../components/StatusChip'
import { useCitizens } from '../hooks/useCitizens'
import type { Citizen, CitizenFilters } from '../types/citizen'
import { formatDate } from '../utils/date'

const columns: GridColDef<Citizen>[] = [
  {
    field: 'lastName',
    headerName: 'ФИО',
    flex: 1.5,
    minWidth: 230,
    renderCell: (params) =>
      `${params.row.lastName} ${params.row.firstName} ${params.row.middleName}`,
  },
  {
    field: 'birthDate',
    headerName: 'Дата рождения',
    width: 135,
    valueFormatter: (value: string) => formatDate(value),
  },
  { field: 'district', headerName: 'Район', flex: 1, minWidth: 100 },
  {
    field: 'status',
    headerName: 'Статус',
    width: 135,
    renderCell: (params) => <StatusChip status={params.row.status} />,
  },
]

function Citizens() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [filters, setFilters] = useState<CitizenFilters>(emptyFilters)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const params = useMemo(
    () => ({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortField: sortModel[0]?.field as keyof Citizen | undefined,
      sortOrder: sortModel[0]?.sort ?? undefined,
      filters,
    }),
    [paginationModel, sortModel, filters],
  )

  const { rows, total, all, loading } = useCitizens(params)

  function applyFilters(newFilters: CitizenFilters) {
    setFilters(newFilters)
    setPaginationModel({ ...paginationModel, page: 0 })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
        <Typography variant="h5">Картотека граждан</Typography>
        <Typography color="text.secondary">
          Найдено: {total.toLocaleString('ru-RU')} из {all.toLocaleString('ru-RU')}
        </Typography>
      </Box>
      <CitizensFilters onApply={applyFilters} />
      <Box sx={{ display: 'flex', gap: 2, height: 640 }}>
        <Box sx={{ flex: 1, minWidth: 0, bgcolor: 'background.paper' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={total}
            loading={loading}
            paginationMode="server"
            sortingMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            onRowClick={(params) => setSelectedId(Number(params.id))}
            pageSizeOptions={[10, 25, 50, 100]}
            disableColumnFilter
            disableColumnMenu
          />
        </Box>
        <Box sx={{ width: 460, flexShrink: 0 }}>
          {selectedId ? (
            <CitizenPreview key={selectedId} id={selectedId} />
          ) : (
            <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <Typography color="text.secondary">Выберите гражданина в списке</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Citizens
