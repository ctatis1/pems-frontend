import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export const ClientForm = ({ selectedCliente, handlerCloseClienteForm }) => {
    const {
        clientes,
        initialClienteForm,
        handlerUpdateCliente,
        handlerAddCliente
    } = useContext(AppContext);

    const [clienteForm, setClienteForm] = useState(initialClienteForm);
    const { nombre, correo } = clienteForm;

    useEffect(() => {
        setClienteForm({
            ...selectedCliente
        })
    },[selectedCliente]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setClienteForm({
            ...clienteForm,
            [name]: value,
        })
    }

    const onCloseForm = () => {
        handlerCloseClienteForm();
        setClienteForm(initialClienteForm);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        clientes.some( cliente => cliente.correo === correo) ?
        handlerUpdateCliente(clienteForm)
        :
        handlerAddCliente(clienteForm);
    }


    return (
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 "
                placeholder="Correo"
                name="correo"
                value={correo}
                onChange={onInputChange} />
            
            <input
                className="form-control my-3"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange} />
            
            <button
                className="btn btn-success"
                type="submit">
                Continuar
            </button>

            {!handlerCloseClienteForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}
            
        </form>
    );
};