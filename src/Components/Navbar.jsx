import React from 'react'
import { Link } from 'react-router-dom'


/* Pasar props al navbar en cada page */
export default function Navbar({user, onLogout}) {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/vacantes">Vacantes</Link>
        <Link to="/aspirantes">Aspirantes</Link>
        <Link to="/procesos">Procesos</Link>

        {!user ? <Link to="/Login"> Login</Link> : ""}
        {!user ? <Link to="/Register"> Register</Link> : ""}
        {user ? <button onClick={onLogout}>Logout</button> : ""}
    </nav>
    </div>
  )
}
