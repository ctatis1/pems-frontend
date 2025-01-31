
export const clienteReducer = (state = [], action) => {
    switch (action.type) {
        case 'addCliente':
            
            return [
                ...state,
                {
                    ...action.payload,
                }
            ];
        case 'removeCliente':
            return state.filter(cliente => cliente.id !== action.payload);
        case 'updateCliente':
            return state.map(cli => {
                if (cli.id === action.payload.id) {
                    return {
                        ...action.payload,
                        nombre: cli.nombre,
                        correo: cli.correo
                    };
                }
                return u;
            })
        case 'loadingCliente':
            return action.payload;
        default:
            return state;
    }
}