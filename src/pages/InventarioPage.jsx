import { useContext, useEffect } from "react";
import { InventarioExport } from "../components/InventarioExport";
import { InventarioList } from "../components/InventarioList";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../auth/context/AuthContext";

export const InventarioPage = () => {
    const {
        getProductos,
        productos
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        getProductos();
    },[productos.length]);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                <h3>Inventario</h3>
                    <small>Apartado para poder exportar la información relacionada con el stock de nuestros productos</small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <InventarioExport />
                    </div>
                </div>
                <br />
                <div className="row">
                    <InventarioList />
                </div>

            </div>
        </>
    );
};