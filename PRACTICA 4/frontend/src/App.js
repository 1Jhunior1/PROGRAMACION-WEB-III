import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { LuDelete } from "react-icons/lu";

function App() {
  const [productos, setProductos] = useState([]);
  const [formularioAgregar, setFormularioAgregar] = useState({ nombre: '', precio: '' });
  const [formularioEditar, setFormularioEditar] = useState({ nombre: '', precio: '' });
  const [productoId, setProductoId] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState('');

  const handleFiltroNombre = (e) => {
    setFiltroNombre(e.target.value);
  };

  const [mostrarEditar, setMostrarEditar] = useState(false);
  const cerrarModalEditar = () => setMostrarEditar(false);
  const abrirModalEditar = () => setMostrarEditar(true);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const cerrarModalCrear = () => setMostrarCrear(false);
  const abrirModalCrear = () => setMostrarCrear(true);

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos');
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      alert('ERROR: ' + error);
      console.error('Error al obtener productos:', error);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  useEffect(() => {
    const buscarProducto = async () => {
      try {
        if (filtroNombre.trim() === '') {
          fetchProductos(); // Si no hay texto, carga todo
          return;
        }

        const respuesta = await fetch(`http://localhost:3001/api/productos/buscar?query=${filtroNombre}`);
        const data = await respuesta.json();

        setProductos(data);
      } catch (error) {
        console.error('Error al buscar producto:', error);
      }
    };

    buscarProducto();
  }, [filtroNombre, fetchProductos]);

  const cambiosFormularioAgregar = (e) => {
    setFormularioAgregar({
      ...formularioAgregar,
      [e.target.name]: e.target.value
    });
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!formularioAgregar.nombre.trim() || !formularioAgregar.precio) {
      alert('Nombre y precio requeridos');
      return;
    }
    try {
      const respuesta = await fetch(`http://localhost:3001/api/productos`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formularioAgregar)
      });
      if (!respuesta.ok) {
        let errorMensaje = 'Error al cargar';
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.error(error);
        }
        throw new Error(errorMensaje);
      }
      await fetchProductos();
      setFormularioAgregar({ nombre: '', precio: '' });
      cerrarModalCrear();

      Swal.fire({
        title: "¡Producto agregado correctamente!",
        icon: "success",
        timer: 2000
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡No se pudo agregar el producto!",
        icon: "error",
        timer: 2000
      });
    }
  };

  const prepararEdicion = (producto) => {
    setFormularioEditar({ nombre: producto.nombre, precio: producto.precio });
    setProductoId(producto.id);
    abrirModalEditar();
  };

  const cambiosFormularioEditar = (e) => {
    setFormularioEditar({
      ...formularioEditar,
      [e.target.name]: e.target.value
    });
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    if (!formularioEditar.nombre.trim() || !formularioEditar.precio) {
      alert('Nombre y precio requeridos');
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/api/productos/${productoId}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formularioEditar)
      });

      if (!respuesta.ok) {
        let errorMensaje = 'Error al actualizar';
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.error(error);
        }
        throw new Error(errorMensaje);
      }

      await fetchProductos();
      setFormularioEditar({ nombre: '', precio: '' });
      cerrarModalEditar();

      Swal.fire({
        title: "¡Producto editado correctamente!",
        icon: "success",
        timer: 2000
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡No se pudo editar el producto!",
        icon: "error",
        timer: 2000
      });
    }
  };

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este producto?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      try {
        const respuesta = await fetch(`http://localhost:3001/api/productos/${id}`, {
          method: 'DELETE'
        });
        if (!respuesta.ok) {
          throw new Error('No se pudo eliminar el producto');
        }
        await fetchProductos();
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success",
          timer: 2000
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto.",
          icon: "error",
          timer: 2000
        });
      }
    }
  };

  return (
    <div className="contenedor">
      <h1>Gestión de Productos</h1>
      <Button variant="primary" onClick={abrirModalCrear} className="mb-3">
        Crear Producto
      </Button>

      <Form.Control
        type="text"
        placeholder="Buscar producto por nombre"
        value={filtroNombre}
        onChange={handleFiltroNombre}
        className="mb-3"
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Producto</th> {/* Nueva columna para el número de producto */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${parseFloat(producto.precio).toFixed(2)}</td>
              <td>producto {index + 1}</td> {/* Aquí mostramos el número de producto */}
              <td>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-warning" onClick={() => prepararEdicion(producto)}>
                    <CiEdit />
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                    <LuDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Crear */}
      <Modal show={mostrarCrear} onHide={cerrarModalCrear}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ingrese el precio"
                name="precio"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.precio}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalCrear}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={agregarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar */}
      <Modal show={mostrarEditar} onHide={cerrarModalEditar}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ingrese el precio"
                name="precio"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.precio}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalEditar}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={editarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
