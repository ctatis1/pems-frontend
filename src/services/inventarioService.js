import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/inventario`;

const config = () => {
    return {
        responseType: "blob",
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

const exportProductos = async(productos) => {
    const response = await axios.post(`${BASE_URL}/export`,
            productos
        , config());
    return response;
}

export default {exportProductos};