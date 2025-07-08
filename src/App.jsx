import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Footer, Header } from './Components'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import {Outlet} from 'react-router-dom'
function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData)
          dispatch(login({userData}));
        else
          dispatch(logout());
      })
      .finally(() => setloading(false));
  },[])
  
  return !loading ? (
    <div>
      <Header /> 
      
      <main>
        <Outlet />
      </main>
      <Footer/>
  </div>
  ): (<div>...loading</div>);
}

export default App
