import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import Swal from "sweetalert2";
import clienteService from "../services/clienteService";
import { clienteReducer } from "../reducers/clienteReducer";

const initialCliente = [];
const initialClienteForm = {
    nombre: '',
    correo: ''
}

export const useCliente = () => {
    const [clientes, dispatch] = useReducer(clienteReducer, initialCliente);
    const [selectedCliente, setSelectedCliente] = useState(initialClienteForm);
    const [visibleClienteForm, setVisibleClienteForm] = useState(false);
    const [clienteErrors, setClienteErrors] = useState([]);
    const navigate = useNavigate();
    const { login, handleLogout } = useContext(AuthContext);

    const getClientes = async () => {
        try {
            const resp = await clienteService.findAllClientes();
            dispatch({
                type: 'loadingCliente',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            }
        }
    }

    const handlerAddCliente = async (cliente) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await clienteService.saveCliente(cliente);
            dispatch({
                type: 'addCliente',
                payload: cliente
            });

            Swal.fire(
                'Cliente Creado',
                'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseClienteForm();
            navigate('/clientes');
        } catch (error) {
            if(error.response?.status === 400 ) setClienteErrors(error.response.data);
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }
    const handlerUpdateCliente = async (cliente) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await clienteService.updateCliente(cliente);
            dispatch({
                type: 'updateCliente',
                payload: cliente
            });

            Swal.fire(
                'Cliente Actualizado',
                'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseClienteForm();
            navigate('/clientes');
        } catch (error) {
            if(error.response?.status === 400 ) setClienteErrors(error.response.data);
            if (error.response?.status == 401) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }

    const handleRemoveCliente = (id) => {
        if (!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el cliente sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await clienteService.removeCliente(id);
                    dispatch({
                        type: 'removeCliente',
                        payload: id
                    });
                    Swal.fire(
                        'Cliente Eliminado!',
                        'El cliente ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 500) setProductoErrors([{ eliminacion: 'No es posible eliminar el Cliente porque está vinculado a una Orden activa' }]);
                    if (error.response?.status == 403) {
                        Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
                    }
                }
            }
        });
    }

    const handlerSelectedClienteForm = (categoria) => {
        setVisibleClienteForm(true);
        setSelectedCliente(categoria);
    }

    const handlerOpenClienteForm = () => {
        setVisibleClienteForm(true);
    }

    const handlerCloseClienteForm = () => {
        setVisibleClienteForm(false);
        setSelectedCliente(initialClienteForm);
        setClienteErrors({});
    }

    return {
        clientes,
        selectedCliente,
        initialClienteForm,
        visibleClienteForm,
        clienteErrors,
        setClienteErrors,
        handleRemoveCliente,
        handlerAddCliente,
        handlerOpenClienteForm,
        handlerCloseClienteForm,
        handlerUpdateCliente,
        getClientes,
        handlerSelectedClienteForm
    };
}