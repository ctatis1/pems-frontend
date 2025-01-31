
import { GenericModal } from './generic/Modal';
import { Form } from 'react-bootstrap';

export const OrdenForm = ({modalConfig, closeModal, handleSubmit, ordenForm, setOrdenForm, clientes, productos}) => {
    const handleProductoChange = (e, productoId) => {
        const cantidad = e.target.value;
        setOrdenForm({
          ...ordenForm,
          productos: { ...ordenForm.productos, [productoId]: cantidad }
        });
    };
    
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
                        as="select"
                        placeholder="Moneda"
                        value={ordenForm.moneda}
                        onChange={(e) => setOrdenForm({ ...ordenForm, moneda:  e.target.value})}
                    >
                        <option value="">Seleccione una Moneda</option>
                        <option value="COP">Peso Colombiano</option>
                        <option value="USD">Dolar Americano</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="select"
                        placeholder="Cliente"
                        value={ordenForm.clienteId}
                        onChange={(e) => setOrdenForm({ ...ordenForm, clienteId:  e.target.value})}
                    >
                        <option value="">Seleccione un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre} - {cliente.correo}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Productos</Form.Label>
                    {productos.map((producto) => (
                        <div key={producto.id} className="d-flex align-items-center mb-2">
                            <Form.Control
                                as="select"
                                onChange={(e) => handleProductoChange(e, producto.id)}
                                style={{ width: "150px", marginRight: "10px" }}
                            >
                                <option value="0">0</option>
                                {[...Array(producto.stock).keys()].map((i) => (
                                    <option key={i+1} value={i+1}>
                                    {i+1}
                                    </option>
                                ))}
                            </Form.Control>
                            <span>{producto.nombre}</span>
                        </div>
                    ))}
                </Form.Group>
            </Form>
        </GenericModal>
    );
}