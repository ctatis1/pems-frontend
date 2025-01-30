import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {

    const {handleLogin } = useContext(AuthContext);
    
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        handleLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
        <div className="container-fluid" style={ {display: 'block'} } >
            <br />
            <div className="row">
                <h5>Inicio de Sesión</h5>
                <small>Ingresa para disfrutar de los servicios que brindamos </small>
            </div>
            <form onSubmit={ onSubmit }>
                <div className="row">
                    <input
                        className="form-control my-3"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={ onInputChange }
                    />
                    
                    <input
                        className="form-control my-3"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                </div>
                
                <div className="row">
                    <div className="col">
                        <button
                            className="btn btn-primary"
                            type="submit">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

}