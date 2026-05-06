import React from 'react'
import { guardarVacantes } from '../js/almacenamiento';

export default function TableVacantesRegistrada({ vacantes, setVacantes }) {

    const eliminar = (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta vacante?")) {
            const listaFiltrada = vacantes.filter(v => v.id !== id);
            guardarVacantes(listaFiltrada); // Persistencia en localStorage
            setVacantes(listaFiltrada);    // Actualización visual inmediata
        }
    };

    return (
        <>
        <div className="seccion">
            <h2>Vacantes Registradas</h2>
            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>Cargo</th>
                            <th>Departamento</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacantes.length === 0 ? (
                            <tr><td colSpan="5" className="sin-datos">No hay vacantes registradas.</td></tr>
                        ) : (
                            vacantes.map(v => (
                                <tr key={v.id}>
                                    <td>{v.titulo}</td>
                                    <td>{v.departamento}</td>
                                    <td><span className={`badge-${v.estado}`}>{v.estado}</span></td>
                                    <td>{v.fecha}</td>
                                    <td>
                                        <button className="btn-peligro" onClick={() => eliminar(v.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
  )
}
