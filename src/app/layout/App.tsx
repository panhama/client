import { useEffect,useState } from 'react';
import { Button, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [mode,setMode] = useState(false);
    function handleToggle() {
     setMode(!mode);
    }
    const theme = createTheme({
     palette: {
       mode: mode ? "dark" : "light"
     }
    })
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme="light"/>
      <CssBaseline />
        <Header  mode={mode} handleToggle={handleToggle}/>
        <Container>
          <Outlet/>
        </Container>
    </ThemeProvider>
  );
}

export default App;
