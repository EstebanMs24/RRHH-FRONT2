Este proyecto es una aplicación web básica que simula cómo una empresa realiza el proceso de selección de personal.

El sistema permite:

Registrar vacantes (puestos de trabajo disponibles).

Registrar aspirantes (personas que aplican a los cargos).

Crear procesos de selección relacionando un aspirante con una vacante.

Hacer seguimiento al proceso cambiando la etapa (convocatoria, entrevista, seleccionado, etc.).

Toda la información se guarda directamente en el navegador usando localStorage, por lo que no necesita servidor ni base de datos externa.

Tecnologías utilizadas

El proyecto fue desarrollado únicamente con tecnologías básicas de desarrollo web:

HTML → estructura de las páginas

CSS → diseño visual

JavaScript → lógica del sistema

localStorage → almacenamiento de datos en el navegador

Funcionamiento general

El uso del sistema sigue este orden:

Registrar vacantes que la empresa necesita cubrir.

Registrar aspirantes que aplican a esos cargos.

Crear un proceso de selección relacionando un aspirante con una vacante.

Actualizar la etapa del proceso para hacer seguimiento al candidato.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
