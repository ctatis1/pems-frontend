import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/categoria';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const findAllCategorias = async() => {
    const response = await axios.get(BASE_URL, config());
    return response.data;
}

const saveCategoria = async ({ nombre }) => {
    return await axios.post(BASE_URL, {
        nombre
    }, config());
}

const removeCategoria = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllCategorias();
}

export default {findAllCategorias, removeCategoria, saveCategoria};