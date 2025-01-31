import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { EmpresaList } from "../components/EmpresaList";
import { AppContext } from "../context/AppContext";
import { EmpresaModalForm } from "../components/ModalForm/EmpresaModalForm";

export const EmpresaPage = () => {
    const {
        getEmpresas,
        handlerOpenEmpresaForm,
        visibleEmpresaForm
    } = useContext(AppContext);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        getEmpresas();
    },[]);
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
                        <button type="button" className="btn btn-primary" onClick={handlerOpenEmpresaForm}>
                            Registrar
                        </button>
                        {!visibleEmpresaForm||
                            <EmpresaModalForm />
                        }
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