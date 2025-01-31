import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import empresaService from "../services/empresaService";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Alert } from "react-bootstrap";
import { EmpresaForm } from "./Form/EmpresaForm";
import { AppContext } from "../context/AppContext";
import { EmpresaModalForm } from "./ModalForm/EmpresaModalForm";

export const EmpresaList = () => {
    const { 
        empresas, 
        visibleEmpresaForm, 
        handlerSelectedEmpresaForm, 
        handleRemoveEmpresa
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    return(
        <>
            {
                empresas?.length === 0 ?
                <Alert variant="primary">Aun no hay Empresas registradas</Alert>
                :
                <>
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
                                <th></th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empresas?.map(empresa => (
                                <tr key={empresa.nit}>
                                    <td>{empresa.nit}</td>
                                    <td>{empresa.nombre}</td>
                                    <td>{empresa.direccion}</td>
                                    <td>{empresa.telefono}</td>
                                    <td>{empresa.productos?.length > 0 ?
                                        <NavLink to={'/inventario'}>Ver Productos</NavLink>
                                        :
                                        "No cuenta con productos"
                                        }</td>
                                {!login.isAdmin || <>
                                        <td>
                                            <i className="bi bi-pen-fill" onClick={() => handlerSelectedEmpresaForm(empresa)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => handleRemoveEmpresa(empresa.nit)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                </>}
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {!visibleEmpresaForm || 
                    <EmpresaModalForm />
                }
                </>
            }
        </>
    );
}