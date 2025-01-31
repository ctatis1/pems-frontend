import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { EmpresaForm } from "../Form/EmpresaForm";

export const EmpresaModalForm = () => {
    
    const {selectedEmpresa, handlerCloseEmpresaForm} = useContext(AppContext);
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            {selectedEmpresa.nit > 0 ? 'Editar' : 'Crear'} Empresa
                            </h5>
                        </div>
                        <div className="modal-body">
                            <EmpresaForm 
                                selectedEmpresa={selectedEmpresa}
                                handlerCloseEmpresaForm={handlerCloseEmpresaForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}