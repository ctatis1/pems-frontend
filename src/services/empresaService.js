import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/empresa`;

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const findAllEmpresas = async() => {
    const response = await axios.get(BASE_URL, config());
    return response.data;
}

const saveEmpresa = async ({ nit, nombre, direccion, telefono }) => {
    return await axios.post(BASE_URL, {
        nit,
        nombre,
        direccion,
        telefono
    }, config());
}
const updateEmpresa = async ({ nit, nombre, direccion, telefono }) => {
    return await axios.put(`${BASE_URL}/${nit}`, {
        nit,
        nombre,
        direccion,
        telefono
    }, config());
}

const removeEmpresa = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllEmpresas();
}

export default {findAllEmpresas, removeEmpresa, saveEmpresa, updateEmpresa};