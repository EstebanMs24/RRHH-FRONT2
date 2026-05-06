import React, { useState, useEffect } from 'react'
import RegistrarVacanteForm from '../Components/RegistrarVacanteForm'
import TableVacantesRegistrada from '../Components/TableVacantesRegistrada'
import Navbar from '../Components/Navbar' 
import Footer from '../Components/Footer' // 1. Importamos el Footer
import { obtenerVacantes } from '../js/almacenamiento' 

export default function VacantesPage({ user, onLogout }) {
    const [vacantes, setVacantes] = useState([]);

    useEffect(() => {
        setVacantes(obtenerVacantes());
    }, []);

    return (
        <>
            <Navbar user={user} onLogout={onLogout} />
            
            <main className="contenedor-principal">
                <div className="seccion">
                    <RegistrarVacanteForm onActualizar={setVacantes} />
                </div>

                <div className="seccion">
                    <TableVacantesRegistrada vacantes={vacantes} setVacantes={setVacantes} />
                </div>
            </main>

            <Footer /> {/* 2. Lo agregamos al final */}
        </>
    )
}