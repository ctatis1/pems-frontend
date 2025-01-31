import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import ordenService from "../services/ordenService";
import { OrdenForm } from "./OrdenForm";
import productoService from "../services/productoService";
import clienteService from "../services/clienteService";

export const OrdenList = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const [updatedOrden, setUpdatedOrden] = useState({
        id: 0,
        moneda: '',
        clienteId: '',
        productos: {}
    });
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ordenService.findAllOrdenes().then((initalOrdenes) => {
            setOrdenes(initalOrdenes);
        }).catch(err => console.log(err));
        productoService.findAllProductos().then((initialProductos) => {
            setProductos(initialProductos);
        }).catch(err => console.log(err));
        clienteService.findAllClientes().then((initialClientes) => {
            setClientes(initialClientes);
        }).catch(err => console.log(err));
    },[location]);

    const deleteOrden = (id) =>{
        ordenService.removeOrden(id).then(ordenesUpdated => {
            setOrdenes(ordenesUpdated);
            alert("Eliminación Exitosa");
        }).catch(err =>
            alert("Ocurrió un problema con la eliminación ", err)
        );
    }

    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Editar Orden",
        });
    };
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };

    const updateOrden = (orden) => {
        setUpdatedOrden({
            id: orden.id,
            moneda: orden.moneda,
            clienteId: orden.clienteId,
            productos: {}
        });
        openModal();
    }
    
    const handleSubmit = () => {
        ordenService
            .updateOrden(updatedOrden)
            .then((resp) => {
                alert(resp.data)
                navigate('/ordenes')
            })
            .catch((err) => alert(err));

        setUpdatedOrden({
            id: 0,
            moneda: '',
            clienteId: '',
            productos: {}
        });
        closeModal();
    }; 


    return(
        <>
            {
                ordenes.length === 0 ?
                <Alert variant="primary">No se han gestionado Ordenes para los Clientes</Alert>
                :
                ordenes.map((orden) => (
                    <>
                        <Row>
                            <Col></Col> 
                            <Col xs={9}>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <Card.Title>Orden #{orden.id}</Card.Title>
                                    <Row>
                                        <Col md={6}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <h6>Cliente</h6>
                                                    <p><strong>Correo:</strong> {orden.clienteCorreo}</p>
                                                    <p><strong>Total:</strong> {orden.total} {orden.moneda}</p>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                        <Col md={6}>
                                            <ListGroup variant="flush">
                                                {orden.productos.map((producto) => (
                                                    <ListGroup.Item key={producto.id}>
                                                        <h6>{producto.nombre}</h6>
                                                        <p><strong>Código:</strong> {producto.codigo}</p>
                                                        <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" style={{ marginRight: '15px' }} onClick={() => updateOrden(orden)}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteOrden(orden.id)}>Eliminar</Button>  
                                </Card.Body>
                            </Card>
                            </Col> 
                            <Col></Col> 
                        </Row>
                        <br />
                        <OrdenForm 
                            setOrdenForm={setUpdatedOrden} 
                            ordenForm={updatedOrden} 
                            closeModal={closeModal} 
                            modalConfig={modalConfig} 
                            handleSubmit={handleSubmit} 
                            clientes={clientes}
                            productos={productos}
                        />
                    </>
                ))
            }
        </>
    );
};