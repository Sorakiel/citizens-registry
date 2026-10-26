import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#1f3a5f' },
    secondary: { main: '#9db4d3' },
    success: { main: '#2f7d4f' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
    text: { primary: '#1f2933', secondary: '#6b7785' },
    divider: '#dfe4ea',
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 13,
    h5: { fontWeight: 500, fontSize: 20 },
    h6: { fontWeight: 500, fontSize: 16 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: '1px solid #dfe4ea' } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true },
    },
  },
})
