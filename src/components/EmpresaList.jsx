import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import empresaService from "../services/empresaService";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Alert } from "react-bootstrap";
import { EmpresaForm } from "./EmpresaForm";

export const EmpresaList = () => {
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();
    const [updatedEmpresa, setUpdatedEmpresa] = useState({
        nit: '',
        nombre: '',
        direccion: '',
        telefono: ''
    });
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
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
    const updateEmpresa = (empresa) =>{
        setUpdatedEmpresa({
            nit: empresa.nit,
            nombre: empresa.nombre,
            direccion: empresa.direccion,
            telefono: empresa.telefono
        })
        openModal();
    }
    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Registrar Empresa",
        });
    };
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };
    
    const handleSubmit = () => {
        empresaService
            .updateEmpresa(updatedEmpresa)
            .then((resp) => {
                alert(resp.data)
                navigate('/empresas')
            })
            .catch((err) => alert(err));

        setUpdatedEmpresa(updatedEmpresa);
        closeModal();
    }; 


    return(
        <>
            {
                empresas.length === 0 ?
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
                                            <i className="bi bi-pen-fill" onClick={() => updateEmpresa(empresa)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                        <td>
                                            <i className="bi bi-trash3-fill" onClick={() => deleteEmpresa(empresa.nit)} style={{ cursor: "pointer" }}></i>
                                        </td>
                                </>}
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <EmpresaForm setEmpresaForm={setUpdatedEmpresa} empresaForm={updatedEmpresa} closeModal={closeModal} modalConfig={modalConfig} handleSubmit={handleSubmit}/>
                </>
            }
        </>
    );
}