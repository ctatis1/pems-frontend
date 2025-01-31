import { useCategoria } from "../hooks/useCategoria";
import { useEmpresa } from "../hooks/useEmpresa"
import { useProducto } from "../hooks/useProducto";
import { AppContext } from "./AppContext";

export const AppProvider = ({children}) => {
    const {
        empresas,
        selectedEmpresa,
        initialEmpresaForm,
        visibleEmpresaForm,
        handleRemoveEmpresa,
        handlerAddEmpresa,
        handlerOpenEmpresaForm,
        handlerCloseEmpresaForm,
        getEmpresas,
        handlerSelectedEmpresaForm,
        handlerUpdateEmpresa
    } = useEmpresa();

    const {
        categorias,
        selectedCategoria,
        initialCategoriaForm,
        visibleCategoriaForm,
        handleRemoveCategoria,
        handlerAddCategoria,
        handlerOpenCategoriaForm,
        handlerCloseCategoriaForm,
        handlerUpdateCategoria,
        getCategorias,
        handlerSelectedCategoriaForm
    } = useCategoria();

    const {
        productos,
        selectedProducto,
        initialProductoForm,
        visibleProductoForm,
        handleRemoveProducto,
        handlerAddProducto,
        handlerOpenProductoForm,
        handlerCloseProductoForm,
        handlerUpdateProducto,
        getProductos,
        handlerSelectedProductoForm
    } = useProducto();

    return(
        <AppContext.Provider value={{
            empresas,
            selectedEmpresa,
            initialEmpresaForm,
            visibleEmpresaForm,
            handleRemoveEmpresa,
            handlerAddEmpresa,
            handlerOpenEmpresaForm,
            handlerCloseEmpresaForm,
            getEmpresas,
            handlerSelectedEmpresaForm,
            handlerUpdateEmpresa,

            categorias,
            selectedCategoria,
            initialCategoriaForm,
            visibleCategoriaForm,
            handleRemoveCategoria,
            handlerAddCategoria,
            handlerOpenCategoriaForm,
            handlerCloseCategoriaForm,
            handlerUpdateCategoria,
            getCategorias,
            handlerSelectedCategoriaForm,

            productos,
            selectedProducto,
            initialProductoForm,
            visibleProductoForm,
            handleRemoveProducto,
            handlerAddProducto,
            handlerOpenProductoForm,
            handlerCloseProductoForm,
            handlerUpdateProducto,
            getProductos,
            handlerSelectedProductoForm
        }}>
            {children}
        </AppContext.Provider>
    );
}