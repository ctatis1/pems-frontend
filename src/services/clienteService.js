import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/cliente`;

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
const findCliente = async({id}) => {
    const response = await axios.get(`${BASE_URL}/${id}`, config());
    return response.data;
}

const saveCliente = async ({ nombre, correo }) => {
    return await axios.post(BASE_URL, {
        correo,
        nombre
    }, config());
}
const updateCliente = async ({ id, correo, nombre }) => {
    return await axios.put(`${BASE_URL}/${id}`, {
        correo,
        nombre
    }, config());
}

const removeCliente = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllClientes();
}

export default {findAllClientes, removeCliente, saveCliente, findCliente, updateCliente};