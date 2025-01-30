import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import empresaService from "../services/empresaService";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Alert } from "react-bootstrap";

export const EmpresaList = () => {
    const [empresas, setEmpresas] = useState([]);
    const location = useLocation();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        empresaService.findAllEmpresas().then((initialEmpresas) => {
            setEmpresas(initialEmpresas);
        }).catch(err => console.log(err));
    },[location ]);

    const deleteEmpresa = (nit) =>{
        empresaService.removeEmpresa(nit).then(empresasUpdated => {
            setEmpresas(empresasUpdated);
            alert("Eliminación Exitosa");
        }).catch(err =>
            alert("Eliminación Exitosa", err)
        );
    }


    return(
        <>
            {
                empresas.length === 0 ?
                <Alert variant="primary">Aun no hay Empresas registradas</Alert>
                :
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nit</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Productos</th>
                            {!login.isAdmin || <>
                                <th></th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empresas.map(empresa => (
                                <tr key={empresa.nit}>
                                    <td>{empresa.nit}</td>
                                    <td>{empresa.nombre}</td>
                                    <td>{empresa.direccion}</td>
                                    <td>{empresa.telefono}</td>
                                    <td>{empresa.productos.length > 0 ?
                                        <NavLink to={{ pathname: '/inventario', state: { empresa } }}>Ver Productos</NavLink>
                                        :
                                        "No cuenta con productos"
                                        }</td>
                                {!login.isAdmin || <>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => deleteEmpresa(empresa.nit)} style={{ cursor: "pointer" }}></i>
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