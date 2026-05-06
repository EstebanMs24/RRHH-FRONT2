import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import AspirantesPage from './Pages/AspirantesPage'
import VacantesPage from './Pages/vacantesPage'

import Aspirantes from './Components/Aspirantes'
import Navbar from './Components/Navbar'

function App() {

  function inicializarDatos() {
        if (!localStorage.getItem("reclutadores")) {
            const reclutadoresIniciales = [
                { nombre: "Ana Gómez",  email: "ana@cesde.edu.co",  password: "12345678" },
                { nombre: "Luis Pérez", email: "luis@cesde.edu.co", password: "abcdefgh" }
            ];
            localStorage.setItem("reclutadores", JSON.stringify(reclutadoresIniciales));
        }
    }

    inicializarDatos();

  let [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') == "true");
  let [userName, setUserName] = useState(localStorage.getItem('userName') || '' );

   // console.log("usuario logueado: "+isAuthenticated);

  useEffect(()=> {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userName', userName);
  },[isAuthenticated, userName]);



  let handleLogin = (userName) => {
    setIsAuthenticated(true); // token de autorizacion
    setUserName(userName);
  };

  let handlerLogout = () => {
    setIsAuthenticated(false); // token de autorizacion
    setUserName('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    console.log(isAuthenticated)
    console.log(userName)
    
  }

  console.log(isAuthenticated)
  console.log(userName)

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage onLogin={handleLogin} />}/>
        <Route path='/Login' element={<LoginPage onLogin={handleLogin} />}/>
        <Route path='/Register' element={<RegisterPage user={userName} onLogout={handlerLogout}/>}/>
        <Route path='/vacantes' element={<VacantesPage user={userName} onLogout={handlerLogout}/>}/>
        <Route path='/Aspirantes' element={isAuthenticated ? <><Navbar user={userName} onLogout={handlerLogout} /><Aspirantes /></> : <Navigate to="/Login" />}/>
      </Routes>
    </>
  )
}

export default App
