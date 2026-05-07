import React, { useState, useEffect } from 'react'
import ProcesosForm from '../Components/ProcesosForm'
import ProcesosTable from '../Components/ProcesosTable'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { obtenerProcesos } from '../js/almacenamiento'

export default function ProcesosPage({ user, onLogout }) {
    const [procesos, setProcesos] = useState([]);

    useEffect(() => {
        setProcesos(obtenerProcesos());
    }, []);

    return (
        <>
            <Navbar user={user} onLogout={onLogout} />

            <main className="contenedor-principal">
                <div className="seccion">
                    <ProcesosForm onActualizar={setProcesos} />
                </div>

                <div className="seccion">
                    <ProcesosTable procesos={procesos} setProcesos={setProcesos} />
                </div>
            </main>

            <Footer />
        </>
    )
}
