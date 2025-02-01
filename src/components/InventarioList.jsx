import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Alert } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

export const InventarioList = () => {
    const { 
        productos, 
        handleRemoveProducto,
        productoErrors,
        setProductoErrors
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            setProductoErrors({});
        }, 5000);
    }, [productoErrors]);

    return(
        <>
            {!productoErrors?.eliminacion || <Alert variant="danger">{productoErrors?.eliminacion}</Alert>}
            {
                productos.length === 0 ?
                <Alert variant="primary">No contamos con Productos registrados de ninguna Empresa</Alert>
                :
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Empresa</th>
                            <th>Nombre</th>
                            <th>Características</th>
                            <th>Precios</th>
                            <th>Unidades</th>
                            <th>Categoria</th>
                            {!login.isAdmin || <>
                                <th></th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.empresa?.nombre}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.caracteristicas !== null ? producto.caracteristicas:'-'}</td>
                                    <td>
                                        {Object.entries(producto.precios).map(([moneda, precio], index) => (
                                            <div key={index}>
                                                <strong>{moneda}: </strong>{precio}
                                            </div>
                                        ))}
                                    </td>
                                    <td>{producto.stock}</td>
                                    <td>{
                                        producto.categoriasNombres?.map((categoria, index) => (
                                            <div key={index}>
                                                {categoria}
                                            </div>
                                        ))}
                                    </td>
                                {!login.isAdmin || <>
                                    <td>
                                        <i className="bi bi-trash-fill" onClick={() => handleRemoveProducto(producto.id)} style={{ cursor: "pointer" }}></i>
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