import { Modal, Button, Form } from "react-bootstrap";

export const GenericModal = ({ 
  isOpen, 
  title, 
  onClose, 
  onConfirm,
  children 
}) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="primary" onClick={onConfirm}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};
