
export const categoriaReducer = (state = [], action) => {
    switch (action.type) {
        case 'addCategoria':
            
            return [
                ...state,
                action.payload,
            ];
        case 'removeCategoria':
            return state.filter(categoria => categoria.id !== action.payload);
        case 'updateCategoria':
            return state.map(cat =>
                cat.id === action.payload.id ? action.payload : cat
            );
        case 'loadingCategoria':
            return action.payload;
        default:
            return state;
    }
}