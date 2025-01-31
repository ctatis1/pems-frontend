import { useEffect, useState } from "react";
import { GenericModal } from "./generic/Modal";
import { Form } from "react-bootstrap";
import productoService from "../services/productoService";
import inventarioService from "../services/inventarioService";

const initialExportForm = {
    correo: ''
}

export const InventarioExport = () => {
    const [exportForm, setExportForm] = useState(initialExportForm);
    const [productos, setProductos] = useState([]);
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Registrar Empresa",
        });
    };

    useEffect(() => {
        productoService.findAllProductos().then((initialProductos) => {
            setProductos(initialProductos);
        }).catch(err => console.log(err));
    },[location]);
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };

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
    const handleSubmit = () => {
        setExportForm(initialExportForm);
        closeModal();
    }; 

    return(
        <>
            <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} onClick={() => handleExport()}>
                Exportar
            </button>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Enviar a Correo
            </button>

            <GenericModal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                onClose={closeModal}
                onConfirm={handleSubmit}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="mail"
                            placeholder="Correo"
                            value={exportForm.correo}
                            onChange={(e) => setExportForm({ ...exportForm, correo: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </GenericModal>
        </>
    );
};