import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { OrdenList } from "../components/OrdenList";
import { AppContext } from "../context/AppContext";
import { OrdenForm } from "../components/Form/OrdenForm";
import { ModalForm } from "../components/ModalForm/ModalForm";

export const OrdenPage = () => {
    const {
        handlerOpenOrdenForm,
        visibleOrdenForm,
        selectedOrden,
        handlerCloseOrdenForm,
        getOrdenes,
        ordenes
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);
    useEffect(() => {
        getOrdenes();
    },[ordenes.length]);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                    <h3>Orden</h3>
                    <small>Todas las ordenes creadas para nuestros clientes puede visualizarlas en este apartado</small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} onClick={handlerOpenOrdenForm}>
                            Registrar
                        </button>
                        {!visibleOrdenForm||
                           <ModalForm entidad={'Orden'} selected={selectedOrden} child={
                                <OrdenForm handlerCloseOrdenForm={handlerCloseOrdenForm} selectedOrden={selectedOrden}/>
                            } />
                        } 
                    </> } 
                    </div>
                </div>
                <br />
                <OrdenList />

            </div>
        </>
    );
};