import * as Producto from '../model/ProductModel.js';

// Obtener todos los productos
export const obtenerTodosProductos = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodosProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
    }

    const newProducto = await Producto.crearNuevoProducto(nombre, precio);
    res.status(201).json({ id: newProducto, message: 'Producto creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar un producto existente
export const ActualizarNuevoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const buscar = await Producto.buscarProducto(id);
    if (!buscar) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!nombre || precio === undefined) {
      return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
    }

    await Producto.ActualizarProducto(id, nombre, precio);
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto
export const EliminarProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const buscar = await Producto.buscarProducto(id);
    if (!buscar) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await Producto.eliminarProducto(id);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

// Buscar un producto por nombre
export const buscarProducto = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Se requiere el parámetro de búsqueda "query"' });
    }

    const productos = await Producto.buscarProductoPorNombre(query);

    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos', error: error.message });
  }
};
