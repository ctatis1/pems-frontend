import { Navbar } from "../components/generic/NavBar";
import { Route, Routes } from "react-router-dom";
import { EmpresaPage } from "../pages/EmpresaPage";
import { HomePage } from "../pages/HomePage";
import { ClientePage } from "../pages/ClientePage";
import { ProductoPage } from "../pages/ProductoPage";
import { OrdenPage } from "../pages/OrdenPage";
import { InventarioPage } from "../pages/InventarioPage";
import { AppProvider } from "../context/AppProvider";

export const HomeRoutes = () => {
    return (
        <>
            <AppProvider>
                <Routes>
                    <Route path="inicio" element={<HomePage />}/>
                    <Route path="empresas" element={<EmpresaPage />}/>
                    <Route path="clientes" element={<ClientePage />}/>
                    <Route path="productos" element={<ProductoPage />}/>
                    <Route path="ordenes" element={<OrdenPage />}/>
                    <Route path="inventario" element={<InventarioPage />}/>
                </Routes>
            </AppProvider>
        </>
    );
}