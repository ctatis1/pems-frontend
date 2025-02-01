import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { NavLink} from "react-router-dom";
import { Alert } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

export const ClientList = () => {
    const { 
        clientes, 
        handleRemoveCliente,
        handlerSelectedClienteForm,
        clienteErrors,
        setClienteErrors
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            setClienteErrors({});
        }, 5000);
    }, [clienteErrors]);

    return(
        <>
            {!clienteErrors?.eliminacion || <Alert variant="danger">{clienteErrors?.eliminacion}</Alert>}
            {
                clientes?.length === 0 ?
                <Alert variant="primary">Aun no hay Clientes registrados</Alert>
                :
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Ordenes</th>
                            {!login.isAdmin || <>
                                <th></th>
                                <th></th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.correo}</td>
                                    <td>{cliente.ordenes?.length > 0 ?
                                        <NavLink to="/ordenes">Ver Ordenes</NavLink>
                                        :
                                        "No cuenta con ordenes vigentes"
                                        }</td>
                                {!login.isAdmin || <>
                                        <td>
                                            <i className="bi bi-pen-fill" onClick={() => handlerSelectedClienteForm(cliente)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => handleRemoveCliente(cliente.id)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                </>}
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>     
            }
        </>
    );
}