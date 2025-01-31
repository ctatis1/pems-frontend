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
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    const getClientes = async () => {
        try {
            const resp = await clienteService.findAllClientes();
            dispatch({
                type: 'loadingCliente',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                handlerLogout();
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
            if (error.response?.status == 403) {
                handlerLogout();
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
                payload: categoria
            });

            Swal.fire(
                'Cliente Actualizado',
                'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseClienteForm();
            navigate('/clientes');
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
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
                    await empresaService.removeCliente(id);
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
                    if (error.response?.status == 403) {
                        handlerLogout();
                    }
                }
            }
        });
    }

    const handlerSelectedClienteForm = (categoria) => {
        setVisibleClienteForm(true);
        setSelectedCliente({ ...categoria });
    }

    const handlerOpenClienteForm = () => {
        setVisibleClienteForm(true);
    }

    const handlerCloseClienteForm = () => {
        setVisibleClienteForm(false);
        setSelectedCliente(initialClienteForm);
    }

    return {
        clientes,
        selectedCliente,
        initialClienteForm,
        visibleClienteForm,
        handleRemoveCliente,
        handlerAddCliente,
        handlerOpenClienteForm,
        handlerCloseClienteForm,
        handlerUpdateCliente,
        getClientes,
        handlerSelectedClienteForm
    };
}