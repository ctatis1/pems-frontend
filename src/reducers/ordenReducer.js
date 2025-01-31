
export const ordenReducer = (state = [], action) => {
    switch (action.type) {
        case 'addOrden':
            
            return [
                ...state,
                {
                    ...action.payload,
                }
            ];
        case 'removeOrden':
            return state.filter(orden => orden.id !== action.payload);
        /*case 'updateOrden':
            return state.map(ord => {
                if (ord.id === action.payload.id) {
                    return {
                        ...action.payload,
                        moneda: ord.moneda,
                        clienteId: ord.clienteId,
                        productos: {
                            ord[]:
                        }
                    };
                }
                return u;
            })*/
        case 'loadingOrden':
            return action.payload;
        default:
            return state;
    }
}