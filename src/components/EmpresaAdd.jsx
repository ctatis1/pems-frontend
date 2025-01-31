import { useState } from 'react'
import empresaService from '../services/empresaService';
import { GenericModal } from './generic/Modal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EmpresaForm } from './EmpresaForm';

const initialEmpresaForm = {
    nit: '',
    nombre: '',
    direccion: '',
    telefono: ''
}

export const EmpresaAdd = () => {
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

            <EmpresaForm setEmpresaForm={setEmpresaForm} empresaForm={empresaForm} closeModal={closeModal} modalConfig={modalConfig} handleSubmit={handleSubmit}/>
        </>
    );
}