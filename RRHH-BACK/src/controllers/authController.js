import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const connection = await pool.getConnection();

    // Verificar si email ya existe
    const [existingUser] = await connection.query(
      'SELECT * FROM reclutadores WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Crear nuevo reclutador
    await connection.query(
      'INSERT INTO reclutadores (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );

    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Reclutador registrado exitosamente',
      data: { nombre, email }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al registrar',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son obligatorios'
      });
    }

    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT * FROM reclutadores WHERE email = ? AND password = ?',
      [email, password]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
    }

    const user = users[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT id, nombre, email FROM reclutadores WHERE id = ?',
      [req.user.id]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil obtenido',
      data: users[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};
