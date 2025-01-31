
export const productoReducer = (state = [], action) => {
    switch (action.type) {
        case 'addProducto':
            
            return [
                ...state,
                action.payload
            ];
        case 'removeProducto':
            return state.filter(prod => prod.id !== action.payload);
        case 'updateProducto':
            return state.map(prod =>
                prod.id === action.payload.id ? action.payload : prod
            );
        case 'loadingProducto':
            return action.payload;
        default:
            return state;
    }
}