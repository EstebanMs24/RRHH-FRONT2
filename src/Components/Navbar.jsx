import React from 'react'
import { Link } from 'react-router-dom'

/* Pasar props al navbar en cada page */
export default function Navbar({user, onLogout}) {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <a href="vacantes.html">Vacantes</a>
        <Link to="/Aspirantes">Aspirantes</Link>
        <a href="procesos.html">Procesos</a>

        {!user ? <Link to="/Login"> Login</Link> : ""}
        {!user ? <Link to="/Register"> Register</Link> : ""}
        {user ? <button onClick={onLogout}>Logout</button> : ""}
    </nav>
    </div>
  )
}
