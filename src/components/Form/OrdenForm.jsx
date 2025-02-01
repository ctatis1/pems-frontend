
import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';

export const OrdenForm = ({ selectedOrden, handlerCloseOrdenForm }) => {
    const {
        ordenes,
        clientes,
        productos,
        initialOrdenForm,
        handlerUpdateOrden,
        handlerAddOrden,
        getClientes,
        getProductos,
        ordenErrors
    } = useContext(AppContext);

    const [ordenForm, setOrdenForm] = useState(initialOrdenForm);

    useEffect(() => {
        getClientes();
        getProductos();
        setOrdenForm({
            ...selectedOrden
        })
    },[selectedOrden]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setOrdenForm({
            ...ordenForm,
            [name]: value,
        })
    }

    const onCloseForm = () => {
        handlerCloseOrdenForm();
        setOrdenForm(initialOrdenForm);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if (selectedOrden.esNueva) {
            handlerUpdateOrden(ordenForm);
        } else {
            handlerAddOrden(ordenForm);
        }
    }

    const handleProductoChange = (e, productoId) => {
        const cantidad = e.target.value;
        setOrdenForm({
          ...ordenForm,
          productos: { ...ordenForm.productos, [productoId]: cantidad }
        });
    };
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control
                    as="select"
                    placeholder="Moneda"
                    name='moneda'
                    value={ordenForm.moneda}
                    onChange={onInputChange}
                >
                    <option value="">Seleccione una Moneda</option>
                    <option value="COP">Peso Colombiano</option>
                    <option value="USD">Dolar Americano</option>
                </Form.Control>
            </Form.Group>
            <p className="text-danger">{ ordenErrors?.moneda}</p>
            <Form.Group className="mb-3">
                <Form.Control
                    as="select"
                    placeholder="Cliente"
                    name='clienteId'
                    value={ordenForm.clienteId}
                    onChange={onInputChange}
                >
                    <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre} - {cliente.correo}
                            </option>
                        ))}
                </Form.Control>
            </Form.Group>
            <p className="text-danger">{ ordenErrors?.clienteId}</p>
            <Form.Group className="mb-3">
                <Form.Label><b>Productos</b></Form.Label>
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
            <Button variant="success" style={{ marginRight: '15px' }} onClick={onSubmit}>Crear</Button>
            <Button variant="primary" onClick={() => onCloseForm()}>Cerrar</Button> 
        </Form>
    );
}