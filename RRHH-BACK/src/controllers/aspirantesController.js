import pool from '../config/db.js';

export const getAll = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [aspirantes] = await connection.query(
      'SELECT * FROM aspirantes ORDER BY created_at DESC'
    );
    connection.release();

    return res.status(200).json({
      success: true,
      message: 'Aspirantes obtenidos',
      data: aspirantes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener aspirantes',
      error: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, perfil } = req.body;

    if (!nombre || !apellido || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, apellido y email son obligatorios'
      });
    }

    const connection = await pool.getConnection();

    // Verificar si email ya existe
    const [existingAspirante] = await connection.query(
      'SELECT * FROM aspirantes WHERE email = ?',
      [email]
    );

    if (existingAspirante.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const fecha = new Date().toISOString().split('T')[0];

    const [result] = await connection.query(
      'INSERT INTO aspirantes (nombre, apellido, email, telefono, perfil, fecha, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, telefono || null, perfil || null, fecha, 'pendiente']
    );

    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Aspirante creado exitosamente',
      data: {
        id: result.insertId,
        nombre,
        apellido,
        email,
        telefono,
        perfil,
        fecha,
        estado: 'pendiente'
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear aspirante',
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, perfil, estado } = req.body;

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE aspirantes SET nombre = ?, apellido = ?, email = ?, telefono = ?, perfil = ?, estado = ? WHERE id = ?',
      [nombre, apellido, email, telefono, perfil, estado, id]
    );

    const [updatedAspirante] = await connection.query(
      'SELECT * FROM aspirantes WHERE id = ?',
      [id]
    );

    connection.release();

    if (updatedAspirante.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Aspirante no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Aspirante actualizado',
      data: updatedAspirante[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar aspirante',
      error: error.message
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM aspirantes WHERE id = ?',
      [id]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Aspirante no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Aspirante eliminado exitosamente',
      data: { id }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar aspirante',
      error: error.message
    });
  }
};
