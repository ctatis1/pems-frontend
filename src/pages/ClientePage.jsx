import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { ClientList } from "../components/ClienteList";
import { ClientForm } from "../components/Form/ClienteForm";
import { AppContext } from "../context/AppContext";
import { ModalForm } from "../components/ModalForm/ModalForm";

export const ClientePage = () => {
    const {
        handlerOpenClienteForm,
        handlerCloseClienteForm,
        visibleClienteForm,
        selectedCliente,
        getClientes
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);
    useEffect(() => {
        getClientes();
    },[]);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                    <h3>Clientes</h3>
                    <small>{login.isAdmin ? "Encontrará y podrá modificar la información de nuestros clientes vinculados":"Encontrará toda la información relacionada con los clientes vinculados"}</small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} onClick={handlerOpenClienteForm}>
                            Registrar
                        </button>
                        {!visibleClienteForm||
                            <ModalForm entidad='Cliente' selected={selectedCliente} child={
                                <ClientForm selectedCliente={selectedCliente} handlerCloseClienteForm={handlerCloseClienteForm}/>
                            } />
                        }
                    </> } 
                    </div>
                </div>
                <br />
                <div className="row">
                    <ClientList />
                </div>

            </div>
        </>
    );
};