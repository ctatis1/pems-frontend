import { useContext, useEffect, useState } from "react";
import clienteService from "../services/clienteService";
import { AuthContext } from "../auth/context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";

export const ClientList = () => {
    const [clientes, setClientes] = useState([]);
    const { login } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        clienteService.findAllClientes().then((initialClientes) => {
            setClientes(initialClientes);
        }).catch(err => console.log(err));
    },[location]);

    const deleteCliente = (id) =>{
        clienteService.removeCliente(id).then(clientesUpdated => {
            setClientes(clientesUpdated);
            alert("Eliminación Exitosa");
        }).catch(err =>
            alert("Eliminación Exitosa", err)
        );
    }


    return(
        <>
            {
                clientes.length === 0 ?
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
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.correo}</td>
                                    <td>{cliente.ordenes.length > 0 ?
                                        <NavLink to="/ordenes">Ver Ordenes</NavLink>
                                        :
                                        "No cuenta con ordenes vigentes"
                                        }</td>
                                {!login.isAdmin || <>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => deleteCliente(cliente.id)} style={{ cursor: "pointer" }}></i>
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