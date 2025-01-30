import { useContext, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { EmpresaList } from "../components/EmpresaList";
import { EmpresaForm } from "../components/EmpresaForm";

export const EmpresaPage = () => {
    const { login } = useContext(AuthContext);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                    <h3>Empresas</h3>
                    <small>Apartado relacionado con todas las empresas registradas en nuestro portal</small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <EmpresaForm />
                    </> } 
                    </div>
                </div>
                <br />
                <div className="row">
                    <EmpresaList />
                </div>

            </div>
        </>
    );
};