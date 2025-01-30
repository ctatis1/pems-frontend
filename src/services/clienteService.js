import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/cliente';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const findAllClientes = async() => {
    const response = await axios.get(BASE_URL, config());
    return response.data;
}

const saveCliente = async ({ nombre, correo }) => {
    return await axios.post(BASE_URL, {
        correo,
        nombre
    }, config());
}

const removeCliente = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllClientes();
}

export default {findAllClientes, removeCliente, saveCliente};