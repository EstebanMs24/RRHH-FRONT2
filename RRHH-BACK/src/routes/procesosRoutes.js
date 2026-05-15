import express from 'express';
import { getAll, create, update, deleteOne } from '../controllers/procesosController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAll);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, deleteOne);

export default router;
