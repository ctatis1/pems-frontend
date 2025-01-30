import { useState } from "react";
import clienteService from "../services/clienteService";
import { useNavigate } from "react-router-dom";
import { GenericModal } from "./generic/Modal";
import { Form } from "react-bootstrap";

const initialClienteForm = {
    nombre: '',
    correo: ''
}

export const ClientForm = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const [clienteForm, setClienteForm] = useState(initialClienteForm);
    const navigate = useNavigate();

    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Afiliar Cliente",
        });
    };
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };
    
    const handleSubmit = () => {
        clienteService
            .saveCliente(clienteForm)
            .then((resp) => {
                alert(resp.data)
                navigate('/clientes')
            })
            .catch(() => alert("Error al guardar el cliente"));

        setClienteForm(initialClienteForm);
        closeModal();
    }; 


    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Afiliar
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
                            type="text"
                            placeholder="Nombre"
                            value={clienteForm.nombre}
                            onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Correo"
                            value={clienteForm.correo}
                            onChange={(e) => setClienteForm({ ...clienteForm, correo: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </GenericModal>
        </>
    );
};