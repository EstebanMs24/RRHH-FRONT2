import React, { useState, useEffect } from 'react'
import { obtenerVacantes, obtenerAspirantes, obtenerProcesos, guardarProcesos, generarId } from '../js/almacenamiento'

export default function ProcesosForm({ onActualizar }) {
    const [form, setForm] = useState({
        idVacante: '',
        idAspirante: '',
        etapa: 'convocatoria',
        observaciones: ''
    });

    const [vacantes, setVacantes] = useState([]);
    const [aspirantes, setAspirantes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        setVacantes(obtenerVacantes());
        setAspirantes(obtenerAspirantes());
    }, []);

    const manejarCambio = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(''), 3000);
    };

    const registrar = () => {
        if (!form.idVacante.trim() || !form.idAspirante.trim()) {
            mostrarMensaje("Por favor selecciona una vacante y un aspirante.", "error");
            return;
        }

        const idVacante = parseInt(form.idVacante);
        const idAspirante = parseInt(form.idAspirante);

        const yaExiste = obtenerProcesos().some(p =>
            p.idVacante === idVacante && p.idAspirante === idAspirante
        );
        if (yaExiste) {
            mostrarMensaje("Este aspirante ya tiene un proceso en esta vacante.", "error");
            return;
        }

        const vacanteEncontrada = vacantes.find(v => v.id === idVacante);
        const aspiranteEncontrado = aspirantes.find(a => a.id === idAspirante);

        const nombreVacante = vacanteEncontrada ? vacanteEncontrada.titulo : "Vacante eliminada";
        const nombreAspirante = aspiranteEncontrado ? `${aspiranteEncontrado.nombre} ${aspiranteEncontrado.apellido}` : "Aspirante eliminado";

        const nuevoProceso = {
            id: generarId(),
            idVacante,
            idAspirante,
            nombreVacante,
            nombreAspirante,
            etapa: form.etapa,
            observaciones: form.observaciones.trim(),
            fecha: new Date().toLocaleDateString("es-CO")
        };

        const listaActualizada = [...obtenerProcesos(), nuevoProceso];
        guardarProcesos(listaActualizada);
        onActualizar(listaActualizada);

        setForm({ idVacante: '', idAspirante: '', etapa: 'convocatoria', observaciones: '' });
        mostrarMensaje("Proceso registrado exitosamente.", "exito");
    };

    return (
        <div className="seccion">
            <h2>📋 Crear Proceso de Selección</h2>
            {mensaje && <div className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</div>}

            <div className="formulario">
                <div className="campo">
                    <label htmlFor="idVacante">Vacante *</label>
                    <select
                        id="idVacante"
                        value={form.idVacante}
                        onChange={manejarCambio}
                    >
                        <option value="">-- Selecciona una vacante --</option>
                        {vacantes.map(v => (
                            <option key={v.id} value={v.id}>{v.titulo} ({v.departamento})</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="idAspirante">Aspirante *</label>
                    <select
                        id="idAspirante"
                        value={form.idAspirante}
                        onChange={manejarCambio}
                    >
                        <option value="">-- Selecciona un aspirante --</option>
                        {aspirantes.map(a => (
                            <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="etapa">Etapa Inicial</label>
                    <select
                        id="etapa"
                        value={form.etapa}
                        onChange={manejarCambio}
                    >
                        <option value="convocatoria">Convocatoria</option>
                        <option value="preseleccion">Preselección</option>
                        <option value="entrevista">Entrevista</option>
                        <option value="prueba">Prueba</option>
                        <option value="seleccionado">Seleccionado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>

                <div className="campo completo">
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea
                        id="observaciones"
                        value={form.observaciones}
                        onChange={manejarCambio}
                        placeholder="Notas sobre el proceso..."
                    ></textarea>
                </div>

                <div className="acciones-formulario">
                    <button type="button" onClick={registrar} className="btn-crear">Crear Proceso</button>
                    <button
                        type="button"
                        onClick={() => {
                            setForm({ idVacante: '', idAspirante: '', etapa: 'convocatoria', observaciones: '' });
                        }}
                        className="btn-limpiar"
                    >
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
    );
}
