import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { emptyFilters } from '../api/citizensApi'
import StatusChip from '../components/StatusChip'
import { useCitizens } from '../hooks/useCitizens'
import type { Citizen } from '../types/citizen'
import { formatDate } from '../utils/date'

const columns: GridColDef<Citizen>[] = [
  {
    field: 'lastName',
    headerName: 'ФИО',
    flex: 1.5,
    minWidth: 220,
    renderCell: (params) =>
      `${params.row.lastName} ${params.row.firstName} ${params.row.middleName}`,
  },
  {
    field: 'birthDate',
    headerName: 'Дата рождения',
    width: 130,
    valueFormatter: (value: string) => formatDate(value),
  },
  { field: 'gender', headerName: 'Пол', width: 100 },
  { field: 'district', headerName: 'Район', flex: 1, minWidth: 120 },
  { field: 'category', headerName: 'Категория', flex: 1, minWidth: 150 },
  {
    field: 'registrationDate',
    headerName: 'На учёте с',
    width: 120,
    valueFormatter: (value: string) => formatDate(value),
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 150,
    renderCell: (params) => <StatusChip status={params.row.status} />,
  },
]

function Citizens() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const params = useMemo(
    () => ({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortField: sortModel[0]?.field as keyof Citizen | undefined,
      sortOrder: sortModel[0]?.sort ?? undefined,
      filters: emptyFilters,
    }),
    [paginationModel, sortModel],
  )

  const { rows, total, loading } = useCitizens(params)

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Картотека граждан
      </Typography>
      <Box sx={{ height: 'calc(100vh - 170px)', bgcolor: 'background.paper' }}>
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
          pageSizeOptions={[10, 25, 50, 100]}
          disableColumnFilter
          disableColumnMenu
        />
      </Box>
    </Box>
  )
}

export default Citizens
