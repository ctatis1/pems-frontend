import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export const ProductoForm = ({ selectedProducto, handlerCloseProductoForm }) => {
    const {
        productos,
        empresas,
        categorias,
        getCategorias,
        getEmpresas,
        initialProductoForm,
        handlerUpdateProducto,
        handlerAddProducto
    } = useContext(AppContext);

    const [productoForm, setProductoForm] = useState(initialProductoForm);
    const { codigo, nombre, caracteristicas, stock, empresaNit, categoriaId, precios } = productoForm;

    useEffect(() => {
        getCategorias();
        getEmpresas();
        setProductoForm({
            ...selectedProducto
        })
    },[selectedProducto]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
    
        setProductoForm(prevState => {
            if (name === "COP" || name === "USD") {
                return {
                    ...prevState,
                    precios: {
                        ...prevState.precios,
                        [name]: value
                    }
                };
            } else {
                return {
                    ...prevState,
                    [name]: value
                };
            }
        });
    };

    const onCloseForm = () => {
        handlerCloseProductoForm();
        setProductoForm(initialProductoForm);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        productos.some( producto => producto.codigo === codigo) ?
        handlerUpdateProducto(productoForm)
        :
        handlerAddProducto(productoForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 "
                placeholder="Código"
                name="codigo"
                onChange={onInputChange} />
            
            <input
                className="form-control my-3"
                placeholder="Nombre"
                name="nombre"
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Características"
                name="caracteristicas"
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Unidades"
                name="stock"
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Precio COP"
                name="COP"
                defaultValue={productoForm.precios.COP} 
                onChange={onInputChange} />
            <input
                className="form-control my-3"
                placeholder="Precio USD"
                name="USD"
                defaultValue={productoForm.precios.USD} 
                onChange={onInputChange} />
            <select
                className="form-control my-3"
                name="empresaNit"
                defaultValue={empresaNit} 
                onChange={onInputChange}
            >
                <option value="">Seleccione una empresa</option>
                {empresas.map((empresa) => (
                    <option key={empresa.nit} value={empresa.nit}>
                        {empresa.nombre}
                    </option>
                ))}
            </select>
            <select
                className="form-control my-3"
                name="categoriaId"
                defaultValue={categoriaId} 
                onChange={onInputChange}
                placeholder="Seleccione una categoria"
            >
                <option value="">Seleccione una categoria</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
            
            <button
                className="btn btn-success"
                type="submit">
                Continuar
            </button>

            {!handlerCloseProductoForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}
            
        </form>
    );
}