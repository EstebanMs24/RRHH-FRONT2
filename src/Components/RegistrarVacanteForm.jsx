import React, { useState } from 'react'
import { obtenerVacantes, guardarVacantes, generarId } from '../js/almacenamiento'

export default function RegistrarVacanteForm({ onActualizar }) {
    const [form, setForm] = useState({ titulo: '', departamento: '', descripcion: '', estado: 'activa' });

    const manejarCambio = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const registrar = () => {
        if (!form.titulo.trim() || !form.departamento.trim()) {
            alert("Por favor completa los campos obligatorios (*).");
            return;
        }

        const nuevaVacante = {
            ...form,
            id: generarId(),
            fecha: new Date().toLocaleDateString("es-CO")
        };

        const listaActualizada = [...obtenerVacantes(), nuevaVacante];
        guardarVacantes(listaActualizada);
        
        onActualizar(listaActualizada);
        
        setForm({ titulo: '', departamento: '', descripcion: '', estado: 'activa' });
    };

    return (
        <>
            <div className="seccion">
                <h2>Registrar Nueva Vacante</h2>
                <div className="formulario">
                    <div className="campo">
                        <label htmlFor="titulo">Título del Cargo *</label>
                        <input type="text" id="titulo" value={form.titulo} onChange={manejarCambio} placeholder="Ej: Analista" />
                    </div>
                    <div className="campo">
                        <label htmlFor="departamento">Departamento *</label>
                        <input type="text" id="departamento" value={form.departamento} onChange={manejarCambio} placeholder="Ej: Tecnología" />
                    </div>
                    <div className="campo completo">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" value={form.descripcion} onChange={manejarCambio}></textarea>
                    </div>
                    <div className="campo">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" value={form.estado} onChange={manejarCambio}>
                            <option value="activa">Activa</option>
                            <option value="cerrada">Cerrada</option>
                        </select>
                    </div>
                    <div className="acciones-formulario">
                        {/* Agregamos el onClick que llama a tu función registrar */}
                        <button type="button" onClick={registrar}>Guardar Vacante</button>
                    </div>
                </div>
            </div>
        </>
    );
}