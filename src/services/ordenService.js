import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/orden`;

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

const saveOrden = async ({ moneda, clienteId, productos }) => {
    return await axios.post(BASE_URL, {
        moneda,
        clienteId,
        productos
    }, config());
}
const updateOrden = async ({ id, moneda, clienteId, productos }) => {
    return await axios.put(`${BASE_URL}/${id}`, {
        moneda,
        clienteId,
        productos
    }, config());
}

const removeOrden = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllOrdenes();
}

export default {findAllOrdenes, saveOrden, removeOrden, updateOrden};