-- Crear base de datos
CREATE DATABASE IF NOT EXISTS db_rrhh;
USE db_rrhh;

-- Tabla: reclutadores
CREATE TABLE IF NOT EXISTS reclutadores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: vacantes
CREATE TABLE IF NOT EXISTS vacantes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  departamento VARCHAR(100),
  descripcion TEXT,
  salario DECIMAL(10, 2),
  estado VARCHAR(50) DEFAULT 'activa',
  fecha DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: aspirantes
CREATE TABLE IF NOT EXISTS aspirantes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefono VARCHAR(15),
  perfil TEXT,
  fecha DATE,
  estado VARCHAR(50) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: procesos_seleccion
CREATE TABLE IF NOT EXISTS procesos_seleccion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_vacante INT NOT NULL,
  id_aspirante INT NOT NULL,
  nombre_vacante VARCHAR(100),
  nombre_aspirante VARCHAR(150),
  etapa VARCHAR(50) DEFAULT 'convocatoria',
  observaciones TEXT,
  fecha_creacion DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_vacante) REFERENCES vacantes(id) ON DELETE CASCADE,
  FOREIGN KEY (id_aspirante) REFERENCES aspirantes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_proceso (id_vacante, id_aspirante)
);

-- Insertar datos iniciales de prueba
INSERT INTO reclutadores (nombre, email, password) VALUES
('Ana Gómez', 'ana@cesde.edu.co', '12345678'),
('Luis Pérez', 'luis@cesde.edu.co', 'abcdefgh');

-- Insertar vacantes de ejemplo
INSERT INTO vacantes (titulo, departamento, descripcion, salario, estado, fecha) VALUES
('Desarrollador Senior', 'IT', 'Buscamos desarrollador con 5+ años experiencia', 3000000, 'activa', CURDATE()),
('Analista de Datos', 'Analytics', 'Especialista en análisis e informes', 2800000, 'activa', CURDATE()),
('Coordinador RRHH', 'Recursos Humanos', 'Coordinador de procesos de selección', 2000000, 'activa', CURDATE());

-- Insertar aspirantes de ejemplo
INSERT INTO aspirantes (nombre, apellido, email, telefono, perfil, fecha, estado) VALUES
('Juan', 'García', 'juan.garcia@email.com', '3001234567', 'Ingeniero en Sistemas', CURDATE(), 'pendiente'),
('María', 'López', 'maria.lopez@email.com', '3007654321', 'Analista de Datos', CURDATE(), 'pendiente'),
('Carlos', 'Martínez', 'carlos.martinez@email.com', '3005555555', 'Desarrollador Full Stack', CURDATE(), 'pendiente');
