// MUI theme configuration matching AutoRL blue aesthetic
import { createTheme } from '@mui/material/styles';

const primary = '#00e3ff';
const accent = '#00bcd4';
const navyDark = '#061226';
const card = '#0b2133';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
      contrastText: '#00101a',
    },
    background: {
      default: '#05102a',
      paper: card
    },
    text: {
      primary: '#eaf6ff',
      secondary: '#9fcfe6'
    },
    success: { main: '#00ff99' },
    warning: { main: '#ffb74d' },
    error: { main: '#ff5c5c' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 700 }
  },
  shape: { borderRadius: 12 }
});

export default theme;

