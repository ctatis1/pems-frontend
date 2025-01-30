import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { useLocation } from "react-router-dom";
import { Alert, NavLink } from "react-bootstrap";
import ordenService from "../services/ordenService";

export const OrdenList = () => {
    const [ordenes, setOrdenes] = useState([]);
    const { login } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        ordenService.findAllOrdenes().then((initalOrdenes) => {
            setOrdenes(initalOrdenes);
        }).catch(err => console.log(err));
    },[location]);

    const deleteOrden = (id) =>{
        ordenService.removeOrden(id).then(ordenesUpdated => {
            setOrdenes(ordenesUpdated);
            alert("Eliminación Exitosa");
        }).catch(err =>
            alert("Ocurrió un problema con la eliminación ", err)
        );
    }


    return(
        <>
            {
                ordenes.length === 0 ?
                <Alert variant="primary">No se han gestionado Ordenes para los Clientes</Alert>
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
                            ordenes.map(orden => (
                                <tr key={orden.id}>
                                    <td>{orden.nombre}</td>
                                    <td>{orden.correo}</td>
                                    <td>{orden.ordenes.length > 0 ?
                                        <NavLink to="/ordenes">Ver Ordenes</NavLink>
                                        :
                                        "No cuenta con ordenes vigentes"
                                        }</td>
                                {!login.isAdmin || <>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => deleteOrden(orden.id)} style={{ cursor: "pointer" }}></i>
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
};