import { useEffect, useState } from 'react'
import empresaService from '../services/empresaService';
import { GenericModal } from './generic/Modal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import productoService from '../services/productoService';
import categoriaService from '../services/categoriaService';

const initialProductoForm = {
    codigo: '',
    nombre: '',
    caracteristicas: '',
    stock: 0,
    precios: {
        'COP': '',
        'USD': ''
    },
    empresaNit: '',
    categoriaId: ''
}
const initialCategoriaForm = {
    nombre: ''
}

export const ProductoForm = () => {
    const [productoModalConfig, setProductoModalConfig] = useState({ isOpen: false });
    const [categoriaModalConfig, setCategoriaModalConfig] = useState({ isOpen: false });
    const [productoForm, setProductoForm] = useState(initialProductoForm);
    const [categoriaForm, setCategoriaForm] = useState(initialCategoriaForm);
    const [categorias, setCategorias] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        empresaService.findAllEmpresas().then((emps) => {
            setEmpresas(emps);
        }).catch(err => console.log(err));
        categoriaService.findAllCategorias().then((cats) => {
            setCategorias(cats);
        }).catch(err => console.log(err));
    },[]);

    const openProductoModal = () => {
        setProductoModalConfig({
          isOpen: true,
          title: "Crear Producto",
        });
    };
    const openCategoriaModal = () => {
        setCategoriaModalConfig({
          isOpen: true,
          title: "Crear Categoria",
        });
    };
    
    const closeProductoModal = () => {
        setProductoModalConfig((prev) => ({ ...prev, isOpen: false }));
    };
    const closeCatgoriaModal = () => {
        setCategoriaModalConfig((prev) => ({ ...prev, isOpen: false }));
    };
    
    const handleProductoSubmit = () => {
        productoService
          .saveProducto(productoForm)
          .then((resp) => {
            alert(resp.data)
            navigate('/productos')
            })
          .catch(() => alert("Error al guardar el producto"));
    
        setProductoForm(initialProductoForm);
        closeProductoModal();
    }; 
    const handleCategoriaSubmit = () => {
        categoriaService
          .saveCategoria(categoriaForm)
          .then((resp) => {
            alert(resp.data)
            navigate('/productos')
            })
          .catch(() => alert("Error al guardar la categoria"));
    
        setProductoForm(initialProductoForm);
        closeProductoModal();
    }; 


    return (
        <>
            <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} onClick={openProductoModal}>
                Registrar
            </button>
            <button type="button" className="btn btn-primary" onClick={openCategoriaModal}>
                Añadir Categoria
            </button>

            <GenericModal
                isOpen={categoriaModalConfig.isOpen}
                title={categoriaModalConfig.title}
                onClose={closeCatgoriaModal}
                onConfirm={handleCategoriaSubmit}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={categoriaForm.nombre}
                            onChange={(e) => setCategoriaForm({ ...categoriaForm, nombre: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </GenericModal>

            <GenericModal
                isOpen={productoModalConfig.isOpen}
                title={productoModalConfig.title}
                onClose={closeProductoModal}
                onConfirm={handleProductoSubmit}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Código"
                            value={productoForm.codigo}
                            onChange={(e) => setProductoForm({ ...productoForm, codigo: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={productoForm.nombre}
                            onChange={(e) => setProductoForm({ ...productoForm, nombre: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Características"
                            value={productoForm.caracteristicas}
                            onChange={(e) => setProductoForm({ ...productoForm, caracteristicas: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Precio en COP"
                            value={productoForm.precios.COP}
                            onChange={(e) => setProductoForm({ ...productoForm, precios: {...productoForm.precios, COP: e.target.value} })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Precio en USD"
                            value={productoForm.precios.USD}
                            onChange={(e) => setProductoForm({ ...productoForm, precios: {...productoForm.precios, USD: e.target.value} })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Unidades"
                            value={productoForm.stock}
                            onChange={(e) => setProductoForm({ ...productoForm, stock: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="select"
                            placeholder="Empresa"
                            value={productoForm.empresaNit}
                            onChange={(e) => setProductoForm({ ...productoForm, empresaNit:  e.target.value})}
                        >
                            <option value="">Seleccione una empresa</option>
                                {empresas.map((empresa) => (
                                    <option key={empresa.nit} value={empresa.nit}>
                                        {empresa.nombre}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="select"
                            placeholder="Categoria"
                            value={productoForm.categoriaId}
                            onChange={(e) => setProductoForm({ ...productoForm, categoriaId:  e.target.value})}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </GenericModal>
        </>
    );
}