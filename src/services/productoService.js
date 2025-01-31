import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/producto';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const findAllProductos = async() => {
    const response = await axios.get(BASE_URL, config());
    return response.data;
}

const saveProducto = async ({ codigo, nombre, caracteristicas, precios, empresaNit, categoriaId, stock }) => {
    return await axios.post(BASE_URL, {
        codigo,
        nombre,
        caracteristicas,
        precios,
        empresaNit,
        categoriaId,
        stock
    }, config());
}

const removeProducto = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, config());
    return findAllProductos();
}

export default {findAllProductos, removeProducto, saveProducto};