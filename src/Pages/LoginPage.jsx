import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({onLogin}) {

    // ── Mensaje de respuesta del servidor (éxito o error) ──
    const [serverMessage, setServerMessage] = useState({ type: "", text: "" });
 
    // ── Configuración de React Hook Form ──
    const { register,handleSubmit, formState: { errors, isSubmitting },} = 
        useForm({
        mode: "onTouched",    // valida al salir del campo, no mientras se escribe
        defaultValues: { email: "", password: "" },
        });

    let navigate = useNavigate();
 
    
    function onSubmit(data) {
        setServerMessage({ type: "", text: "" });
 
        const reclutadores = JSON.parse(localStorage.getItem("reclutadores") || "[]");
        const usuario = reclutadores.find(
            (r) => r.email === data.email && r.password === data.password
        );
 
        if (!usuario) {
            setServerMessage({ type: "error", text: "Usuario y/o contraseña incorrectos." });
            return;
        }
 
        if (typeof onLogin === 'function') {
            onLogin(usuario.nombre);
        }
 
        setServerMessage({ type: "success", text: `¡Bienvenido, ${usuario.nombre}!` });
        setTimeout(() => navigate("/Register"), 1500);
    }


  return (
    <>
        <Navbar/>
            <div className="cesde-login-bg">
 
            {/* Barra de acento */}
            <div className="cesde-nav-bar" />
 
            {/* Centrado vertical de la tarjeta */}
            <div className="d-flex align-items-center justify-content-center flex-grow-1 py-5 px-3">
                <div className="cesde-card">
 
                    <h2>Iniciar Sesión</h2>
                    <p className="cesde-subtitle">
                        Accede con tu correo y contraseña de reclutador
                    </p>
 
                    {/* Alerta de respuesta del servidor */}
                    {serverMessage.text && (
                        <div
                            className={serverMessage.type === "success" ? "cesde-alert-success" : "cesde-alert-error"}
                            role="alert"
                        >
                            {serverMessage.text}
                        </div>
                    )}
 
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
 
                        {/* Campo: Correo electrónico */}
                        <div className="mb-3">
                            <label htmlFor="email" className="cesde-label">
                                Correo Electrónico *
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Ej: reclutador@cesde.edu.co"
                                className={`form-control cesde-input${errors.email ? " is-invalid" : ""}`}
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio.",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Ingresa un correo electrónico válido.",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El correo no puede superar los 100 caracteres.",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="cesde-field-error" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
 
                        {/* Campo: Contraseña */}
                        <div className="mb-4">
                            <label htmlFor="password" className="cesde-label">
                                Contraseña *
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Tu contraseña"
                                className={`form-control cesde-input${errors.password ? " is-invalid" : ""}`}
                                {...register("password", {
                                    required: "La contraseña es obligatoria.",
                                    minLength: {
                                        value: 8,
                                        message: "La contraseña debe tener al menos 8 caracteres.",
                                    },
                                    maxLength: {
                                        value: 128,
                                        message: "La contraseña es demasiado larga.",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="cesde-field-error" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
 
                        {/* Botón de envío */}
                        <button
                            type="submit"
                            className="cesde-btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Verificando...
                                </>
                            ) : (
                                "Ingresar al Sistema"
                            )}
                        </button>
 
                    </form>
 
                    <hr className="cesde-divider" />
 
                    {/* Enlace a registro */}
                    <div className="cesde-register-link">
                        ¿Aún no tienes cuenta?{" "}
                        <Link to="/Register">
                            Registrar reclutador
                        </Link>
                    </div>
 
                </div>
            </div>
 
            <footer className="cesde-footer">
                CESDE &copy; 2024 &mdash; Sistema de Selección RRHH
            </footer>
 
        </div>

        <Footer/>
    </>
  )
}
