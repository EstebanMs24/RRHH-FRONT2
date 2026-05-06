import React, { useState, useCallback } from "react";
import { crearAspirante } from "../services/storageService";
import "./AspirantesForm.css";

export default function AspirantesForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    perfil: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [isLoading, setIsLoading] = useState(false);

  const mostrarMensaje = useCallback((texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 4000);
  }, []);

  const validarEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim()) {
      mostrarMensaje("Por favor completa los campos obligatorios (*)", "error");
      setIsLoading(false);
      return;
    }

    if (!validarEmail(formData.email)) {
      mostrarMensaje("Por favor ingresa un correo electrónico válido", "error");
      setIsLoading(false);
      return;
    }

    // Crear aspirante
    try {
      crearAspirante({
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        perfil: formData.perfil.trim(),
      });

      mostrarMensaje("Aspirante registrado exitosamente", "exito");
      limpiarFormulario();
      onSuccess?.();
    } catch (error) {
      mostrarMensaje("Error al registrar el aspirante", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      perfil: "",
    });
  };

  return (
    <div className="formulario-container">
      <h2>Registrar Nuevo Aspirante</h2>

      {mensaje.texto && (
        <div className={`mensaje mensaje-${mensaje.tipo}`}>
          {mensaje.tipo === "exito" && "✓ "}
          {mensaje.tipo === "error" && "✕ "}
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="nombre">
            Nombre <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan"
            maxLength="60"
            disabled={isLoading}
          />
        </div>

        <div className="campo">
          <label htmlFor="apellido">
            Apellido <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ej: Pérez García"
            maxLength="60"
            disabled={isLoading}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">
            Correo Electrónico <span className="obligatorio">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: juan.perez@correo.com"
            maxLength="100"
            disabled={isLoading}
          />
        </div>

        <div className="campo">
          <label htmlFor="telefono">Teléfono / Celular</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej: 300 123 4567"
            maxLength="20"
            disabled={isLoading}
          />
        </div>

        <div className="campo campo-completo">
          <label htmlFor="perfil">Perfil / Resumen Hoja de Vida</label>
          <textarea
            id="perfil"
            name="perfil"
            value={formData.perfil}
            onChange={handleChange}
            placeholder="Describe brevemente la formación, experiencia y habilidades del aspirante..."
            disabled={isLoading}
            rows="4"
          />
        </div>

        <div className="acciones-formulario">
          <button
            type="submit"
            className="btn btn-primario"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "💾 Guardar Aspirante"}
          </button>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={limpiarFormulario}
            disabled={isLoading}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
