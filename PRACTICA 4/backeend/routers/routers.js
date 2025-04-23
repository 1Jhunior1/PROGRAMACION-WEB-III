// routers.js
import express from 'express';
import { obtenerTodosProductos, crearProducto, ActualizarNuevoProducto, EliminarProductos, buscarProducto } from '../controller/ProductController.js';

const router = express.Router();

// Definir las rutas
router.get('/productos', obtenerTodosProductos);
router.post('/productos', crearProducto);
router.put('/productos/:id', ActualizarNuevoProducto);
router.delete('/productos/:id', EliminarProductos);
router.get('/productos/buscar', buscarProducto); // Agregar la ruta para buscar productos

export default router;  // Exportación por defecto
