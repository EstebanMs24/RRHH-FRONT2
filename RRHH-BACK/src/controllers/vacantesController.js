import pool from '../config/db.js';

export const getAll = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [vacantes] = await connection.query(
      'SELECT * FROM vacantes ORDER BY created_at DESC'
    );
    connection.release();

    return res.status(200).json({
      success: true,
      message: 'Vacantes obtenidas',
      data: vacantes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener vacantes',
      error: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const { titulo, departamento, descripcion, salario, estado } = req.body;

    if (!titulo || !departamento) {
      return res.status(400).json({
        success: false,
        message: 'Título y departamento son obligatorios'
      });
    }

    const connection = await pool.getConnection();
    const fecha = new Date().toISOString().split('T')[0];

    const [result] = await connection.query(
      'INSERT INTO vacantes (titulo, departamento, descripcion, salario, estado, fecha) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, departamento, descripcion || null, salario || null, estado || 'activa', fecha]
    );

    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Vacante creada exitosamente',
      data: {
        id: result.insertId,
        titulo,
        departamento,
        descripcion,
        salario,
        estado: estado || 'activa',
        fecha
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear vacante',
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, departamento, descripcion, salario, estado } = req.body;

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE vacantes SET titulo = ?, departamento = ?, descripcion = ?, salario = ?, estado = ? WHERE id = ?',
      [titulo, departamento, descripcion, salario, estado, id]
    );

    const [updatedVacante] = await connection.query(
      'SELECT * FROM vacantes WHERE id = ?',
      [id]
    );

    connection.release();

    if (updatedVacante.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vacante no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Vacante actualizada',
      data: updatedVacante[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar vacante',
      error: error.message
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM vacantes WHERE id = ?',
      [id]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vacante no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Vacante eliminada exitosamente',
      data: { id }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar vacante',
      error: error.message
    });
  }
};
