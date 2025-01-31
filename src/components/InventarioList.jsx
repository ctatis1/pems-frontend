import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";

import { NavLink, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import productoService from "../services/productoService";
import { Alert } from "react-bootstrap";

export const InventarioList = () => {
    const [productos, setProductos] = useState([]);
    const location = useLocation();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        productoService.findAllProductos().then((initialProductos) => {
            setProductos(initialProductos);
        }).catch(err => console.log(err));
    },[location]);

    const deleteProducto = (id) =>{
        productoService.removeProducto(id).then(productosUpdated => {
            setProductos(productosUpdated);
            alert("Eliminación Exitosa");
        }).catch(err =>
            alert("Ocurrió un error al realizar la eliminación", err)
        );
    }

    return(
        <>
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
                            productos
                                .map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.empresa.nombre}</td>
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
                                        producto.categoriasNombres.map((categoria, index) => (
                                            <div key={index}>
                                                {categoria}
                                            </div>
                                        ))}
                                    </td>
                                {!login.isAdmin || <>
                                    <td>
                                        <i className="bi bi-trash-fill" onClick={() => deleteProducto(producto.id)} style={{ cursor: "pointer" }}></i>
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