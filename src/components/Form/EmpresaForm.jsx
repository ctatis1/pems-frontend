
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export const EmpresaForm = ({ selectedEmpresa, handlerCloseEmpresaForm }) => {
    const {
        empresas,
        initialEmpresaForm,
        handlerUpdateEmpresa,
        handlerAddEmpresa
    } = useContext(AppContext);

    const [empresaForm, setEmpresaForm] = useState(initialEmpresaForm);
    const { nit, nombre, direccion, telefono } = empresaForm;

    useEffect(() => {
        setEmpresaForm({
            ...selectedEmpresa
        })
    },[selectedEmpresa]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setEmpresaForm({
            ...empresaForm,
            [name]: value,
        })
    }

    const onCloseForm = () => {
        handlerCloseEmpresaForm();
        setEmpresaForm(initialEmpresaForm);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        empresas.some( empresa => empresa.nit === nit) ?
        handlerUpdateEmpresa(empresaForm)
        :
        handlerAddEmpresa(empresaForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 "
                placeholder="NIT"
                name="nit"
                value={nit}
                onChange={onInputChange} />
            
            <input
                className="form-control my-3"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Direcion"
                name="direccion"
                value={direccion}
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Telefono"
                name="telefono"
                value={telefono}
                onChange={onInputChange} />
            
            <button
                className="btn btn-success"
                type="submit">
                Continuar
            </button>

            {!handlerCloseEmpresaForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}
            
        </form>
    );
}