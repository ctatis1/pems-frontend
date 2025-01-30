import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { OrdenList } from "../components/OrdenList";

export const OrdenPage = () => {
    const { login } = useContext(AuthContext);
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
                        
                    </> } 
                    </div>
                </div>
                <br />
                <div className="row">
                    <OrdenList />
                </div>

            </div>
        </>
    );
};