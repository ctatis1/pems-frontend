
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export const CategoriaForm = ({ selectedCategoria, handlerCloseCategoriaForm }) => {
    const {
        categorias,
        initialCategoriaForm,
        handlerUpdateCategoria,
        handlerAddCategoria,
        categoriaErrors
    } = useContext(AppContext);

    const [categoriaForm, setCategoriaForm] = useState(initialCategoriaForm);
    const { nombre } = categoriaForm;

    useEffect(() => {
        setCategoriaForm({
            ...selectedCategoria
        })
    },[selectedCategoria]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setCategoriaForm({
            ...categoriaForm,
            [name]: value,
        })
    }

    const onCloseForm = () => {
        handlerCloseCategoriaForm();
        setCategoriaForm(initialCategoriaForm);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        handlerAddCategoria(categoriaForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            
            <input
                className="form-control my-3"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange} />
            <p className="text-danger">{ categoriaErrors?.nombre}</p>
            
            <button
                className="btn btn-success"
                type="submit">
                Continuar
            </button>

            {!handlerCloseCategoriaForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}
            
        </form>
    );
}