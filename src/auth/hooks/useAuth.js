import { useReducer } from "react"
import { loginReducer } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Swal from "sweetalert2";

const initialLogin = 
    JSON.parse(sessionStorage.getItem('login')) 
    ||
    {
        isAuth: false,
        isAdmin: false,
        user: undefined
    }


export const useAuth = () => {
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({
            type: 'logout'
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        navigate('/login');
    }

    const handleLogin = async ({ username, password }) => {
        try {
            const response = await loginUser({username, password});
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);
            const user = {
                username: claims.sub
            }
            dispatch({
                type: 'login',
                payload: {
                    user, isAdmin: claims.isAdmin
                }
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/inicio');
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error')
                    .then(() => handleLogout());
            } else {
                throw error;
            }
        }
    }

    return {
        login, handleLogin, handleLogout
    }
}