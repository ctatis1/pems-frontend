import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

    const { login, handleLogout } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/inicio">EMS App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {!login.isAuth || 
                <>
                    <div className="collapse navbar-collapse" id="navbarNav"> 
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/empresas">
                                    Empresas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/inventario">
                                    Inventario
                                </NavLink>
                            </li>
                            {
                                !login.isAdmin || <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/productos">
                                            Productos
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/clientes">
                                            Clientes
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/ordenes">
                                            Ordenes
                                        </NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                        <span className="nav-item nav-link text-primary mx-3">
                            {login.user?.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-primary">
                            Logout
                        </button>
                    </div>
                </>
                }
            </div>
                
        </nav>
    );
}