import React, { useState, useEffect } from "react";
import { obtenerAspirantes, eliminarAspirante } from "../services/storageService";
import "./AspirantesTable.css";

export default function AspirantesTable({ refresh }) {
  const [aspirantes, setAspirantes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    cargarAspirantes();
  }, [refresh]);

  const cargarAspirantes = () => {
    const datos = obtenerAspirantes();
    setAspirantes(datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 4000);
  };

  const handleEliminar = (id, nombre) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`
      )
    ) {
      try {
        eliminarAspirante(id);
        cargarAspirantes();
        mostrarMensaje(`${nombre} ha sido eliminado exitosamente`, "exito");
      } catch (error) {
        mostrarMensaje("Error al eliminar el aspirante", "error");
        console.error(error);
      }
    }
  };

  const aspiranteFiltrados = aspirantes.filter((a) => {
    const searchTerm = filtro.toLowerCase();
    return (
      a.nombre.toLowerCase().includes(searchTerm) ||
      a.apellido.toLowerCase().includes(searchTerm) ||
      a.email.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <h2>Aspirantes Registrados</h2>
        <div className="tabla-info">
          <span className="badge">{aspirantes.length} aspirantes</span>
        </div>
      </div>

      {mensaje.texto && (
        <div className={`mensaje mensaje-${mensaje.tipo}`}>
          {mensaje.tipo === "exito" && "✓ "}
          {mensaje.tipo === "error" && "✕ "}
          {mensaje.texto}
        </div>
      )}

      <div className="tabla-filtro">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, apellido o correo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />
        {filtro && (
          <button
            className="btn-limpiar-filtro"
            onClick={() => setFiltro("")}
          >
            ✕
          </button>
        )}
      </div>

      {aspirantes.length === 0 ? (
        <div className="sin-datos">
          <p>📋 No hay aspirantes registrados aún</p>
          <p className="texto-secundario">Crea el primer aspirante usando el formulario de arriba</p>
        </div>
      ) : aspiranteFiltrados.length === 0 ? (
        <div className="sin-datos">
          <p>🔍 No se encontraron resultados</p>
          <p className="texto-secundario">Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla-aspirantes">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Perfil</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aspiranteFiltrados.map((aspirante) => (
                <tr key={aspirante.id} className="tabla-fila">
                  <td className="nombre-celda">
                    <strong>{aspirante.nombre} {aspirante.apellido}</strong>
                  </td>
                  <td className="email-celda">
                    <a href={`mailto:${aspirante.email}`}>{aspirante.email}</a>
                  </td>
                  <td>{aspirante.telefono || "—"}</td>
                  <td className="perfil-celda">
                    {aspirante.perfil ? (
                      <span title={aspirante.perfil} className="perfil-resumen">
                        {aspirante.perfil.substring(0, 50)}
                        {aspirante.perfil.length > 50 ? "..." : ""}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="fecha-celda">{aspirante.fecha}</td>
                  <td className="acciones-celda">
                    <button
                      className="btn btn-peligro btn-sm"
                      onClick={() => handleEliminar(aspirante.id, `${aspirante.nombre} ${aspirante.apellido}`)}
                      title="Eliminar aspirante"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
