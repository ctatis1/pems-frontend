
export const ordenReducer = (state = [], action) => {
    switch (action.type) {
        case 'addOrden':
            
            return [
                ...state,
                action.payload
            ];
        case 'removeOrden':
            return state.filter(orden => orden.id !== action.payload);
        case 'updateOrden':
            return state.map(ord =>
                ord.id === action.payload.id ? action.payload : ord
            );
        case 'loadingOrden':
            return action.payload;
        default:
            return state;
    }
}