import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import Swal from "sweetalert2";
import { productoReducer } from "../reducers/productoReducer";
import productoService from "../services/productoService";

const initialProducto = [];
const initialProductoForm = {
    codigo: '',
    nombre: '',
    caracteristicas: '',
    stock: 0,
    precios: {
        COP: 0,
        USD: 0
    },
    empresaNit: '',
    categoriaId: ''
}

export const useProducto = () => {
    const [productos, dispatch] = useReducer(productoReducer, initialProducto);
    const [selectedProducto, setSelectedProducto] = useState(initialProductoForm);
    const [visibleProductoForm, setVisibleProductoForm] = useState(false);
    const [productoErrors, setProductoErrors] = useState([]);
    const navigate = useNavigate();
    const { login, handleLogout } = useContext(AuthContext);

    const getProductos = async () => {
        try {
            const resp = await productoService.findAllProductos();
            dispatch({
                type: 'loadingProducto',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            }
        }
    }

    const handlerAddProducto = async (producto) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await productoService.saveProducto(producto);
            dispatch({
                type: 'addProducto',
                payload: producto
            });

            Swal.fire(
                'Producto Creado',
                'El producto ha sido actualizado con exito!',
                'success'
            );
            handlerCloseProductoForm();
            navigate('/productos');
        } catch (error) {
            if(error.response?.status === 400 ) setProductoErrors(error.response.data);
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }
    const handlerUpdateProducto = async (producto) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await productoService.updateProducto(producto);
            dispatch({
                type: 'updateProducto',
                payload: producto
            });

            Swal.fire(
                'Producto Actualizado',
                'El producto ha sido actualizado con exito!',
                'success'
            );
            handlerCloseProductoForm();
            navigate('/productos');
        } catch (error) {
            if(error.response?.status === 400 ) setProductoErrors(error.response.data);
            if (error.response?.status == 401) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }

    const handleRemoveProducto = (id) => {
        if (!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el producto sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await productoService.removeProducto(id);
                    dispatch({
                        type: 'removeProducto',
                        payload: id
                    });
                    Swal.fire(
                        'Producto Eliminado!',
                        'El producto ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 500) setProductoErrors({ eliminacion: 'No es posible eliminar el producto porque está vinculado a una Orden activa' }); 
                    if (error.response?.status == 403) {
                        Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
                    }
                }
            }
        });
    }

    const handlerSelectedProductoForm = (empresa) => {
        setVisibleProductoForm(true);
        setSelectedProducto({ ...empresa });
    }

    const handlerOpenProductoForm = () => {
        setVisibleProductoForm(true);
    }

    const handlerCloseProductoForm = () => {
        setVisibleProductoForm(false);
        setSelectedProducto(initialProductoForm);
        setProductoErrors({});
    }

    return {
        productos,
        selectedProducto,
        initialProductoForm,
        visibleProductoForm,
        productoErrors,
        setProductoErrors,
        handleRemoveProducto,
        handlerAddProducto,
        handlerOpenProductoForm,
        handlerCloseProductoForm,
        handlerUpdateProducto,
        getProductos,
        handlerSelectedProductoForm
    };
}