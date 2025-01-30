import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { useLocation } from "react-router-dom";
import { ProductoForm } from "../components/ProductoForm";

export const ProductoPage = () => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    return(
        <>
            <div className="container my-4">
                <div className="row">
                <h3>Productos</h3>
                    <small>Logramos gestionar los productos de cada una las Empresas alidas </small>
                    <small>Para ver los productos acceda a la pestaña <b>Inventario</b> </small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <ProductoForm />
                    </> } 
                    </div>
                </div>
            </div>
        </>
    );
};