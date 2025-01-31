
import { GenericModal } from './generic/Modal';
import { Form } from 'react-bootstrap';

export const EmpresaForm = ({modalConfig, closeModal, handleSubmit, empresaForm, setEmpresaForm}) => {
    return (
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
    );
}