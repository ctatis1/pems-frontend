import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import Swal from "sweetalert2";
import { categoriaReducer } from "../reducers/categoriaReducer";
import categoriaService from "../services/categoriaService";

const initialCategoria = [];
const initialCategoriaForm = {
    nombre: ''
}
const initialErrores = {
    nombre: ''
}

export const useCategoria = () => {
    const [categorias, dispatch] = useReducer(categoriaReducer, initialCategoria);
    const [selectedCategoria, setSelectedCategoria] = useState(initialCategoriaForm);
    const [visibleCategoriaForm, setVisibleCategoriaForm] = useState(false);
    const [categoriaErrors, setCategoriaErrors] = useState(initialErrores);
    const navigate = useNavigate();
    const { login, handleLogout } = useContext(AuthContext);

    const getCategorias = async () => {
        try {
            const resp = await categoriaService.findAllCategorias();
            dispatch({
                type: 'loadingCategoria',
                payload: resp
            });   
        } catch (error) {
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            }
        }
    }

    const handlerAddCategoria = async (categoria) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await categoriaService.saveCategoria(categoria);
            dispatch({
                type: 'addCategoria',
                payload: categoria
            });

            Swal.fire(
                'Categoria Creada',
                'La categoria ha sido actualizado con exito!',
                'success'
            );
            handlerCloseCategoriaForm();
            navigate('/productos');
        } catch (error) {
            if(error.response?.status === 400 ) setCategoriaErrors(error.response.data);
            if (error.response?.status == 403) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }
    const handlerUpdateCategoria = async (categoria) => {
        if (!login.isAdmin) return;
        let resp;
        try {
            resp = await categoriaService.updateCategoria(categoria);
            dispatch({
                type: 'updateCategoria',
                payload: categoria
            });

            Swal.fire(
                'Categoria Actualizada',
                'La categoria ha sido actualizado con exito!',
                'success'
            );
            handlerCloseCategoriaForm();
            navigate('/productos');
        } catch (error) {
            if(error.response?.status === 400 ) setCategoriaErrors(error.response.data);
            if (error.response?.status == 401) {
                Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }

    const handleRemoveCategoria = (id) => {
        if (!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado la categoria sera eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await empresaService.removeCategoria(id);
                    dispatch({
                        type: 'removeCategoria',
                        payload: id
                    });
                    Swal.fire(
                        'Categoria Eliminada!',
                        'La categoria ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 403) {
                        Swal.fire('Error Autorizacion', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
                    }
                }
            }
        });
    }

    const handlerSelectedCategoriaForm = (categoria) => {
        setVisibleCategoriaForm(true);
        setSelectedCategoria({ ...categoria });
    }

    const handlerOpenCategoriaForm = () => {
        setVisibleCategoriaForm(true);
    }

    const handlerCloseCategoriaForm = () => {
        setVisibleCategoriaForm(false);
        setSelectedCategoria(initialCategoriaForm);
        setCategoriaErrors({});
    }

    return {
        categorias,
        selectedCategoria,
        initialCategoriaForm,
        visibleCategoriaForm,
        categoriaErrors,
        handleRemoveCategoria,
        handlerAddCategoria,
        handlerOpenCategoriaForm,
        handlerCloseCategoriaForm,
        handlerUpdateCategoria,
        getCategorias,
        handlerSelectedCategoriaForm
    };
}