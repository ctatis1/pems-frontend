import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import Swal from "sweetalert2";
import ordenService from "../services/ordenService";
import { ordenReducer } from "../reducers/ordenReducer";

const initialOrden = [];
const initialOrdenForm = {
    moneda: '',
    clienteId: '',
    productos: {}
}


export const useOrden = () => {
    const [ordenes, dispatch] = useReducer(ordenReducer, initialOrden);
    const [selectedOrden, setSelectedOrden] = useState(initialOrdenForm);
    const [visibleOrdenForm, setVisibleOrdenForm] = useState(false);
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    const getOrdenes = async () => {
        try {
            const resp = await ordenService.findAllOrdenes();
            dispatch({
                type: 'loadingOrden',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                handlerLogout();
            }
        }
    }

    const handlerAddOrden = async (orden) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await ordenService.saveOrden(orden);
            dispatch({
                type: 'addOrden',
                payload: orden
            });


            Swal.fire(
                'Orden Creada',
                'La orden ha sido actualizado con exito!',
                'success'
            );
            handlerCloseOrdenForm();
            navigate('/ordenes');
        } catch (error) {
            if (error.response?.status == 403) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }
    const handlerUpdateOrden = async (orden) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await ordenService.updateOrden(orden);
            dispatch({
                type: 'updateOrden',
                payload: producto
            });

            Swal.fire(
                'Orden Actualizado',
                'La orden ha sido actualizado con exito!',
                'success'
            );
            handlerCloseOrdenForm();
            navigate('/ordenes');
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handleRemoveOrden = (id) => {
        if (!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado la orden sera eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await ordenService.removeOrden(id);
                    dispatch({
                        type: 'removeOrden',
                        payload: id
                    });
                    Swal.fire(
                        'Orden Eliminado!',
                        'La orden ha sido eliminado con exito!',
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

    const handlerSelectedOrdenForm = (orden) => {
        setVisibleOrdenForm(true);
        setSelectedOrden({
            ...orden,
            esNueva: !orden.id 
        });
    }

    const handlerOpenOrdenForm = () => {
        setVisibleOrdenForm(true);
    }

    const handlerCloseOrdenForm = () => {
        setVisibleOrdenForm(false);
        setSelectedOrden(initialOrdenForm);
    }

    return {
        ordenes,
        selectedOrden,
        initialOrdenForm,
        visibleOrdenForm,
        handleRemoveOrden,
        handlerAddOrden,
        handlerOpenOrdenForm,
        handlerCloseOrdenForm,
        handlerUpdateOrden,
        getOrdenes,
        handlerSelectedOrdenForm
    };
}