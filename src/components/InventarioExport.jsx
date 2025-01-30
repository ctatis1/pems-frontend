import { useState } from "react";
import { GenericModal } from "./generic/Modal";
import { Form } from "react-bootstrap";

const initialExportForm = {
    correo: ''
}

export const InventarioExport = () => {
    const [exportForm, setExportForm] = useState(initialExportForm);
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Registrar Empresa",
        });
    };
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };

    const handleExport = () => {
        
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