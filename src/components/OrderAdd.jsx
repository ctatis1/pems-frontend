import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { OrdenForm } from './OrdenForm';
import ordenService from '../services/ordenService';
import productoService from '../services/productoService';
import clienteService from '../services/clienteService';

const initialOrdenForm = {
    moneda: '',
    clienteId: '',
    productos: {}
}

export const OrdenAdd = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const [ordenForm, setOrdenForm] = useState(initialOrdenForm);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    const openModal = () => {
        setModalConfig({
          isOpen: true,
          title: "Crear Orden",
        });
    };

    useEffect(() => {
        clienteService.findAllClientes().then((initialClientes) => {
            setClientes(initialClientes);
        }).catch(err => console.log(err));
        productoService.findAllProductos().then((initialProductos) => {
            setProductos(initialProductos);
        }).catch(err => console.log(err));
    },[]);
    
    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };
    
    const handleSubmit = () => {
        const productosValidos = Object.entries(ordenForm.productos)
        .filter(([productoId, cantidad]) => cantidad > 0)
        .reduce((acc, [productoId, cantidad]) => {
            acc[productoId] = cantidad;
            return acc;
        }, {});

        const ordenConProductosValidos = {
            ...ordenForm,
            productos: productosValidos
        };
        ordenService
            .saveOrden(ordenConProductosValidos)
            .then((resp) => {
                alert(resp.data)
                navigate('/ordenes')
            })
            .catch(() => alert("Error al guardar la orden"));
        
        setOrdenForm(initialOrdenForm);
        closeModal();
    }; 


    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Registrar
            </button>

            <OrdenForm 
                setOrdenForm={setOrdenForm} 
                ordenForm={ordenForm} 
                closeModal={closeModal} 
                modalConfig={modalConfig} 
                handleSubmit={handleSubmit} 
                clientes={clientes}
                productos={productos}
            />
        </>
    );
}