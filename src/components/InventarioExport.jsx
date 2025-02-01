import { useEffect, useState } from "react";
import productoService from "../services/productoService";
import inventarioService from "../services/inventarioService";

export const InventarioExport = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        productoService.findAllProductos().then((initialProductos) => {
            setProductos(initialProductos);
        }).catch(err => console.log(err));
    },[location]);

    const handleExport = () => {
        inventarioService.exportProductos(productos).then((resp) => {
            console.log("Response data type:", resp.data.type);
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `ems_inventario_${new Date().toISOString()}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(err => alert(err));
    }; 

    return(
        <>
            <button type="button" className="btn btn-primary" onClick={() => handleExport()}>
                Exportar
            </button>
        </>
    );
};