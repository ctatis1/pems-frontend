
export const clienteReducer = (state = [], action) => {
    switch (action.type) {
        case 'addCliente':
            
            return [
                ...state,
                action.payload,
            ];
        case 'removeCliente':
            return state.filter(cliente => cliente.id !== action.payload);
        case 'updateCliente':
            return state.map(cli =>
                cli.id === action.payload.id ? action.payload : cli
            );
        case 'loadingCliente':
            return action.payload;
        default:
            return state;
    }
}