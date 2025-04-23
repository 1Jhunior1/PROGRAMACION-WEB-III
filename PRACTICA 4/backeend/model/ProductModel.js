import pool from "../config/db.js";

// Obtener todos los productos
export const obtenerTodosProductos = async () => {
  const [array] = await pool.promise().query('SELECT * FROM productos');
  return array;
};

// Crear un nuevo producto
export const crearNuevoProducto = async (nombre, precio) => {
  const [resultado] = await pool.promise().query(
    'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
    [nombre, precio]
  );
  return resultado.insertId;
};

// Actualizar un producto
export const ActualizarProducto = async (id, nombre, precio) => {
  await pool.promise().query(
    'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
    [nombre, precio, id]
  );
};

// Buscar un producto por ID
export const buscarProducto = async (id) => {
  const [array] = await pool.promise().query(
    'SELECT * FROM productos WHERE id = ?',
    [id]
  );
  return array[0]; 
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  await pool.promise().query('DELETE FROM productos WHERE id = ?', [id]);
};

// Buscar productos por nombre
export const buscarProductoPorNombre = async (nombre) => {
  const [array] = await pool.promise().query(
    'SELECT * FROM productos WHERE nombre LIKE ?',
    [`%${nombre}%`] // Usamos el operador LIKE para buscar por nombre
  );
  return array;
};
