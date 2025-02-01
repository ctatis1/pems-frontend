import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { Alert, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

export const OrdenList = () => {
    const { 
        ordenes, 
        handlerSelectedOrdenForm, 
        handleRemoveOrden
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    return(
        <>
            {
                ordenes.length === 0 ?
                <Alert variant="primary">No se han gestionado Ordenes para los Clientes</Alert>
                :
                ordenes.map((orden) => (
                    <>
                        <Row key={orden.id}>
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
                                                {Array.isArray(orden.productos) && orden.productos?.map((producto) => (
                                                    <ListGroup.Item key={producto.id}>
                                                        <h6>{producto.nombre}</h6>
                                                        <p><strong>Código:</strong> {producto.codigo}</p>
                                                        <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                    {!login.isAdmin || <>
                                        <Button variant="primary" style={{ marginRight: '15px' }} onClick={() => handlerSelectedOrdenForm(orden)}>Editar</Button>
                                        <Button variant="danger" onClick={() => handleRemoveOrden(orden.id)}>Eliminar</Button> 
                                    </>} 
                                </Card.Body>
                            </Card>
                            </Col> 
                            <Col></Col> 
                        </Row>
                        <br />
                    </>
                ))
            }
        </>
    );
};