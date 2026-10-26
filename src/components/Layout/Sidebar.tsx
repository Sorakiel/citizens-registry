import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import PersonAddIcon from '@mui/icons-material/PersonAddAltOutlined'
import { NavLink } from 'react-router-dom'

export const SIDEBAR_WIDTH = 220

const menu = [
  { title: 'Главная', path: '/', icon: <DashboardIcon /> },
  { title: 'Граждане', path: '/citizens', icon: <PeopleIcon /> },
  { title: 'Новая запись', path: '/citizens/new', icon: <PersonAddIcon /> },
]

function Sidebar() {
  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        bgcolor: '#1f3a5f',
        color: '#c9d4e3',
        minHeight: '100vh',
      }}
    >
      <Typography
        sx={{ color: '#fff', fontWeight: 500, fontSize: 16, p: 2, borderBottom: '1px solid #35527a' }}
      >
        Картотека
      </Typography>
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end
            sx={{
              color: 'inherit',
              '&.active': { bgcolor: '#2c4d7c', color: '#fff', borderLeft: '3px solid #8fb0e0' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
