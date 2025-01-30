import { useState } from 'react'
import empresaService from '../services/empresaService';
import { GenericModal } from './generic/Modal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialEmpresaForm = {
    nit: '',
    nombre: '',
    direccion: '',
    telefono: ''
}

export const EmpresaForm = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const [empresaForm, setEmpresaForm] = useState(initialEmpresaForm);
    const navigate = useNavigate();

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
            .saveEmpresa(empresaForm)
            .then((resp) => {
                alert(resp.data)
                navigate('/empresas')
            })
            .catch(() => alert("Error al guardar la empresa"));

        setEmpresaForm(initialEmpresaForm);
        closeModal();
    }; 


    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Registrar
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
                            placeholder="NIT"
                            value={empresaForm.nit}
                            onChange={(e) => setEmpresaForm({ ...empresaForm, nit: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={empresaForm.nombre}
                            onChange={(e) => setEmpresaForm({ ...empresaForm, nombre: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            value={empresaForm.direccion}
                            onChange={(e) => setEmpresaForm({ ...empresaForm, direccion: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Teléfono"
                            value={empresaForm.telefono}
                            onChange={(e) => setEmpresaForm({ ...empresaForm, telefono: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </GenericModal>
        </>
    );
}