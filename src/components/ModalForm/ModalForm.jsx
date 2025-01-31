import { Children, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { EmpresaForm } from "../Form/EmpresaForm";

export const ModalForm = ({selected, entidad, child}) => {
    
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            {selected.id > 0 ? 'Editar' : 'Crear'} {entidad}
                            </h5>
                        </div>
                        <div className="modal-body">
                            {child}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}