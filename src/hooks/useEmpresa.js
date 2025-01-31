import { useContext, useReducer, useState } from "react";
import { empresasReducer } from "../reducers/empresaReducer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import empresaService from "../services/empresaService";
import Swal from "sweetalert2";

const initialEmpresa = [];
const initialEmpresaForm = {
    nit: '',
    nombre: '',
    direccion: '',
    telefono: ''
}

export const useEmpresa = () => {
    const [empresas, dispatch] = useReducer(empresasReducer, initialEmpresa);
    const [selectedEmpresa, setSelectedEmpresa] = useState(initialEmpresaForm);
    const [visibleEmpresaForm, setVisibleEmpresaForm] = useState(false);
    const navigate = useNavigate();
    const { login, handlerLogout } = useContext(AuthContext);

    const getEmpresas = async () => {
        try {
            const resp = await empresaService.findAllEmpresas();
            dispatch({
                type: 'loadingEmpresa',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                handlerLogout();
            }
        }
    }

    const handlerAddEmpresa = async (empresa) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await empresaService.saveEmpresa(empresa);
            dispatch({
                type: 'addEmpresa',
                payload: empresa
            });

            Swal.fire(
                'Empresa Creada',
                'La empresa ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/empresas');
        } catch (error) {
            if (error.response?.status == 403) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }
    const handlerUpdateEmpresa = async (empresa) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await empresaService.updateEmpresa(empresa);
            dispatch({
                type: 'updateEmpresa',
                payload: empresa
            });

            Swal.fire(
                'Empresa Actualizada',
                'La empresa ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/empresas');
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handleRemoveEmpresa = (nit) => {
        if (!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado la empresa sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (res) => {
            try {
                await empresaService.removeEmpresa(nit);
                dispatch({
                    type: 'removeEmpresa',
                    payload: nit
                });
                Swal.fire(
                    'Empresa Eliminado!',
                    'La empresa ha sido eliminado con exito!',
                    'success'
                );
            } catch (error) {
                if (error.response?.status == 403) {
                    handlerLogout();
                }
            }
        });
    }

    const handlerSelectedEmpresaForm = (empresa) => {
        setVisibleEmpresaForm(true);
        setSelectedEmpresa({ ...empresa });
    }

    const handlerOpenEmpresaForm = () => {
        setVisibleEmpresaForm(true);
    }

    const handlerCloseEmpresaForm = () => {
        setVisibleEmpresaForm(false);
        setSelectedEmpresa(initialEmpresaForm);
    }

    return {
        empresas,
        selectedEmpresa,
        initialEmpresaForm,
        visibleEmpresaForm,
        handleRemoveEmpresa,
        handlerAddEmpresa,
        handlerOpenEmpresaForm,
        handlerCloseEmpresaForm,
        handlerUpdateEmpresa,
        getEmpresas,
        handlerSelectedEmpresaForm
    };
}