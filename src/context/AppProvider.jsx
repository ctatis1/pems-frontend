import { useCategoria } from "../hooks/useCategoria";
import { useCliente } from "../hooks/useCliente";
import { useEmpresa } from "../hooks/useEmpresa"
import { useOrden } from "../hooks/useOrden";
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

    const {
        clientes,
        selectedCliente,
        initialClienteForm,
        visibleClienteForm,
        handleRemoveCliente,
        handlerAddCliente,
        handlerOpenClienteForm,
        handlerCloseClienteForm,
        handlerUpdateCliente,
        getClientes,
        handlerSelectedClienteForm
    } = useCliente();

    const {
        ordenes,
        selectedOrden,
        initialOrdenForm,
        visibleOrdenForm,
        handleRemoveOrden,
        handlerAddOrden,
        handlerOpenOrdenForm,
        handlerCloseOrdenForm,
        handlerUpdateOrden,
        getOrdenes,
        handlerSelectedOrdenForm
    } = useOrden();

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
            handlerSelectedProductoForm,

            clientes,
            selectedCliente,
            initialClienteForm,
            visibleClienteForm,
            handleRemoveCliente,
            handlerAddCliente,
            handlerOpenClienteForm,
            handlerCloseClienteForm,
            handlerUpdateCliente,
            getClientes,
            handlerSelectedClienteForm,

            ordenes,
            selectedOrden,
            initialOrdenForm,
            visibleOrdenForm,
            handleRemoveOrden,
            handlerAddOrden,
            handlerOpenOrdenForm,
            handlerCloseOrdenForm,
            handlerUpdateOrden,
            getOrdenes,
            handlerSelectedOrdenForm
        }}>
            {children}
        </AppContext.Provider>
    );
}