import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage({user, onLogout}) {
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" })
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    mode: "onTouched",
    defaultValues: { nombres: "", apellidos: "", email: "", password: "", confirmPassword: "", sexo: "", fechaNacimiento: "" },
  })
  
  let navigate = useNavigate()
  const password = watch("password")

  function onSubmit(data) {
    setServerMessage({ type: "", text: "" })

    const reclutadores = JSON.parse(localStorage.getItem("reclutadores") || "[]")
    
    if (reclutadores.find(r => r.email === data.email)) {
      setServerMessage({ type: "error", text: "Este correo ya está registrado." })
      return
    }

    const nuevoReclutador = {
      nombre: `${data.nombres} ${data.apellidos}`,
      email: data.email,
      password: data.password
    }

    reclutadores.push(nuevoReclutador)
    localStorage.setItem("reclutadores", JSON.stringify(reclutadores))

    setServerMessage({ type: "success", text: "¡Registro completado! Redirigiendo a login..." })
    setTimeout(() => navigate("/Login"), 1500)
  }

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="cesde-login-bg">
        <div className="cesde-nav-bar" />

        <div className="d-flex align-items-center justify-content-center flex-grow-1 py-5 px-3">
          <div className="cesde-card">
            <h2>Registrar Reclutador</h2>
            <p className="cesde-subtitle">Crea tu cuenta para comenzar</p>

            {serverMessage.text && (
              <div
                className={serverMessage.type === "success" ? "cesde-alert-success" : "cesde-alert-error"}
                role="alert"
              >
                {serverMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Nombres */}
              <div className="mb-3">
                <label htmlFor="nombres" className="cesde-label">Nombres *</label>
                <input
                  id="nombres"
                  type="text"
                  placeholder="Ej: Juan Carlos"
                  className={`form-control cesde-input${errors.nombres ? " is-invalid" : ""}`}
                  {...register("nombres", {
                    required: "Los nombres son obligatorios.",
                    minLength: { value: 2, message: "Mínimo 2 caracteres." },
                  })}
                />
                {errors.nombres && <p className="cesde-field-error">{errors.nombres.message}</p>}
              </div>

              {/* Apellidos */}
              <div className="mb-3">
                <label htmlFor="apellidos" className="cesde-label">Apellidos *</label>
                <input
                  id="apellidos"
                  type="text"
                  placeholder="Ej: García López"
                  className={`form-control cesde-input${errors.apellidos ? " is-invalid" : ""}`}
                  {...register("apellidos", {
                    required: "Los apellidos son obligatorios.",
                    minLength: { value: 2, message: "Mínimo 2 caracteres." },
                  })}
                />
                {errors.apellidos && <p className="cesde-field-error">{errors.apellidos.message}</p>}
              </div>

              {/* Correo */}
              <div className="mb-3">
                <label htmlFor="email" className="cesde-label">Correo Electrónico *</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Ej: reclutador@cesde.edu.co"
                  className={`form-control cesde-input${errors.email ? " is-invalid" : ""}`}
                  {...register("email", {
                    required: "El correo es obligatorio.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Correo inválido.",
                    },
                  })}
                />
                {errors.email && <p className="cesde-field-error">{errors.email.message}</p>}
              </div>

              {/* Sexo */}
              <div className="mb-3">
                <label htmlFor="sexo" className="cesde-label">Sexo *</label>
                <select
                  id="sexo"
                  className={`form-control cesde-input${errors.sexo ? " is-invalid" : ""}`}
                  {...register("sexo", { required: "Selecciona un sexo." })}
                >
                  <option value="">Selecciona...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.sexo && <p className="cesde-field-error">{errors.sexo.message}</p>}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="cesde-label">Fecha de Nacimiento *</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  className={`form-control cesde-input${errors.fechaNacimiento ? " is-invalid" : ""}`}
                  {...register("fechaNacimiento", { required: "La fecha de nacimiento es obligatoria." })}
                />
                {errors.fechaNacimiento && <p className="cesde-field-error">{errors.fechaNacimiento.message}</p>}
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="cesde-label">Contraseña *</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  className={`form-control cesde-input${errors.password ? " is-invalid" : ""}`}
                  {...register("password", {
                    required: "La contraseña es obligatoria.",
                    minLength: { value: 8, message: "Mínimo 8 caracteres." },
                    maxLength: { value: 128, message: "Máximo 128 caracteres." },
                  })}
                />
                {errors.password && <p className="cesde-field-error">{errors.password.message}</p>}
              </div>

              {/* Confirmar Contraseña */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="cesde-label">Confirmar Contraseña *</label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repite tu contraseña"
                  className={`form-control cesde-input${errors.confirmPassword ? " is-invalid" : ""}`}
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña.",
                    validate: value => value === password || "Las contraseñas no coinciden.",
                  })}
                />
                {errors.confirmPassword && <p className="cesde-field-error">{errors.confirmPassword.message}</p>}
              </div>

              {/* Botón */}
              <button type="submit" className="cesde-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Registrando...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </form>

            <hr className="cesde-divider" />

            <div className="cesde-register-link">
              ¿Ya tienes cuenta? <Link to="/Login">Inicia sesión</Link>
            </div>
          </div>
        </div>

        <footer className="cesde-footer">
          CESDE &copy; 2024 &mdash; Sistema de Selección RRHH
        </footer>
      </div>
      <Footer />
    </>
  )
}
