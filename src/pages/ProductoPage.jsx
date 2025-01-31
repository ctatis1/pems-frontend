import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { ModalForm } from "../components/ModalForm/ModalForm";
import { CategoriaForm } from "../components/Form/CategoriaForm";
import { AppContext } from "../context/AppContext";
import { ProductoForm } from "../components/Form/ProductoForm";

export const ProductoPage = () => {
    const {
        handlerOpenCategoriaForm,
        visibleCategoriaForm,
        selectedCategoria,
        handlerCloseCategoriaForm,

        handlerOpenProductoForm,
        visibleProductoForm,
        selectedProducto,
        handlerCloseProductoForm,
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                <h3>Productos</h3>
                    <small>Logramos gestionar los productos de cada una las Empresas alidas </small>
                    <small>Para ver los productos acceda a la pestaña <b>Inventario</b> </small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} onClick={handlerOpenProductoForm}>
                            Registrar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handlerOpenCategoriaForm}>
                            Añadir Categoria
                        </button>
                        {!visibleCategoriaForm||
                            <ModalForm entidad={'Categoria'} selected={selectedCategoria} child={
                                <CategoriaForm handlerCloseCategoriaForm={handlerCloseCategoriaForm} selectedCategoria={selectedCategoria}/>
                            } />
                        }
                        {!visibleProductoForm||
                            <ModalForm entidad={'Producto'} selected={selectedProducto} child={
                                <ProductoForm handlerCloseProductoForm={handlerCloseProductoForm} selectedProducto={selectedProducto}/>
                            } />
                        }
                    </> } 
                    </div>
                </div>
            </div>
        </>
    );
};