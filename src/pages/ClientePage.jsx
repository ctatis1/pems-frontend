import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { ClientList } from "../components/ClienteList";
import { ClientForm } from "../components/ClienteForm";

export const ClientePage = () => {
    const { login } = useContext(AuthContext);
    return(
        <>
            <div className="container my-4">
                <div className="row">
                    <h3>Clientes</h3>
                    <small>{login.isAdmin ? "Encontrará y podrá modificar la información de nuestros clientes vinculados":"Encontrará toda la información relacionada con los clientes vinculados"}</small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    {!login.isAdmin || <>
                        <ClientForm />
                    </> } 
                    </div>
                </div>
                <br />
                <div className="row">
                    <ClientList />
                </div>

            </div>
        </>
    );
};