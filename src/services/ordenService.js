import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/orden';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const findAllOrdenes = async() => {
    const response = await axios.get(BASE_URL, config());
    return response.data;
}

const saveOrden = async ({ total, clienteCorreo, productos }) => {
    return await axios.post(BASE_URL, {
        total,
        clienteCorreo,
        productos
    }, config());
}

const removeOrden = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllOrdenes();
}

export default {findAllOrdenes, saveOrden, removeOrden};