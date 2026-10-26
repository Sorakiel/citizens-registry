import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function Header() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid #dfe4ea' }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        <Typography color="text.secondary">Информационная система учёта граждан</Typography>
        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12 }}>ОП</Avatar>
      </Toolbar>
    </AppBar>
  )
}

export default Header
