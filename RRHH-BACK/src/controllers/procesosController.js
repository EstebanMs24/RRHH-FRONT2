import pool from '../config/db.js';

export const getAll = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [procesos] = await connection.query(
      'SELECT * FROM procesos_seleccion ORDER BY created_at DESC'
    );
    connection.release();

    return res.status(200).json({
      success: true,
      message: 'Procesos obtenidos',
      data: procesos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener procesos',
      error: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const { id_vacante, id_aspirante, nombreVacante, nombreAspirante, etapa, observaciones } = req.body;

    if (!id_vacante || !id_aspirante) {
      return res.status(400).json({
        success: false,
        message: 'ID de vacante e ID de aspirante son obligatorios'
      });
    }

    const connection = await pool.getConnection();

    // Verificar que no exista un proceso con la misma vacante y aspirante
    const [existingProceso] = await connection.query(
      'SELECT * FROM procesos_seleccion WHERE id_vacante = ? AND id_aspirante = ?',
      [id_vacante, id_aspirante]
    );

    if (existingProceso.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'Ya existe un proceso para esta vacante y aspirante'
      });
    }

    const fecha = new Date().toISOString().split('T')[0];

    const [result] = await connection.query(
      'INSERT INTO procesos_seleccion (id_vacante, id_aspirante, nombre_vacante, nombre_aspirante, etapa, observaciones, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_vacante, id_aspirante, nombreVacante || null, nombreAspirante || null, etapa || 'convocatoria', observaciones || null, fecha]
    );

    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Proceso creado exitosamente',
      data: {
        id: result.insertId,
        id_vacante,
        id_aspirante,
        nombreVacante,
        nombreAspirante,
        etapa: etapa || 'convocatoria',
        observaciones,
        fecha_creacion: fecha
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear proceso',
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { etapa, observaciones } = req.body;

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE procesos_seleccion SET etapa = ?, observaciones = ? WHERE id = ?',
      [etapa, observaciones, id]
    );

    const [updatedProceso] = await connection.query(
      'SELECT * FROM procesos_seleccion WHERE id = ?',
      [id]
    );

    connection.release();

    if (updatedProceso.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proceso no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Proceso actualizado',
      data: updatedProceso[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar proceso',
      error: error.message
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM procesos_seleccion WHERE id = ?',
      [id]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proceso no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Proceso eliminado exitosamente',
      data: { id }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar proceso',
      error: error.message
    });
  }
};
