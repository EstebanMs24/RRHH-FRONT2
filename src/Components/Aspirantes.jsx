import React, { useState } from "react";
import AspirantesForm from "./AspirantesForm";
import AspirantesTable from "./AspirantesTable";
import "./Aspirantes.css";

export default function Aspirantes() {
  const [refresh, setRefresh] = useState(0);

  const handleFormSuccess = () => {
    // Trigger tabla refresh
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="aspirantes-page">
      <div className="page-header">
        <h1>👥 Gestión de Aspirantes</h1>
        <p className="page-subtitle">
          Registra y administra los candidatos para los procesos de selección
        </p>
      </div>

      <div className="aspirantes-content">
        <section className="seccion formulario-seccion">
          <AspirantesForm onSuccess={handleFormSuccess} />
        </section>

        <section className="seccion tabla-seccion">
          <AspirantesTable refresh={refresh} />
        </section>
      </div>
    </div>
  );
}
