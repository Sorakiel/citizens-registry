import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { relatedTables } from '../config/related'
import type { RelatedColumn } from '../config/related'
import type { CitizenRelated } from '../types/citizen'
import { formatDate } from '../utils/date'

interface RelatedTableProps {
  tableKey: keyof CitizenRelated
  rows: object[]
}

function formatCell(value: unknown, column: RelatedColumn) {
  if (column.type === 'boolean') {
    return value ? 'Да' : 'Нет'
  }
  if (column.type === 'date') {
    return formatDate(String(value))
  }
  if (column.type === 'money') {
    return `${Number(value).toLocaleString('ru-RU')} ₽`
  }
  return String(value)
}

function RelatedTable({ tableKey, rows }: RelatedTableProps) {
  const config = relatedTables[tableKey]

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {config.title}
      </Typography>
      <TableContainer sx={{ border: '1px solid #dfe4ea', borderRadius: 1 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f9fafb' }}>
            <TableRow>
              {config.columns.map((column) => (
                <TableCell key={column.key} sx={{ color: 'text.secondary' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {config.columns.map((column) => (
                  <TableCell key={column.key}>
                    {formatCell((row as Record<string, unknown>)[column.key], column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={config.columns.length} sx={{ color: 'text.secondary' }}>
                  Нет записей
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default RelatedTable
