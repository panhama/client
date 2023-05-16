import { useEffect,useState } from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import { useAppDispatch } from '../store/ConfigureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {const buyerId = getCookie('buyerId')
  if (buyerId){
    agent.Basket.get()
    .then(basket => dispatch(setBasket(basket)))
    .catch(err => console.log(err))
    .finally(()=> setLoading(false))
  } else { setLoading(false)}
},[dispatch])
  const [mode,setMode] = useState(false);
    function handleToggle() {
     setMode(!mode);
    }
    const theme = createTheme({
     palette: {
       mode: mode ? "dark" : "light"
     }
    })
    if(loading) return <LoadingComponent message='init app..'/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme="light"/>
      <CssBaseline />
        <Header mode={mode} handleToggle={handleToggle}/>
        <Container>
          <Outlet/>
        </Container>
    </ThemeProvider>
  );
}

export default App;






// useEffect(()=> {const buyerId = getCookie('buyerId')
// if (buyerId){
//   agent.Basket.get()
//   .then(basket => setBasket(basket))
//   .catch(err => console.log(err))
//   .finally(()=> setLoading(false))
// } else { setLoading(false)}
// },[basket])