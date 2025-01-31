
export const empresasReducer = (state = [], action) => {

    switch (action.type) {
        case 'addEmpresa':
            return [
                ...state,
                action.payload                
            ];
        case 'removeEmpresa':
            return state.filter(empresa => empresa.nit !== action.payload);
        case 'updateEmpresa':
            return state.map(emp =>
                emp.nit === action.payload.nit ? action.payload : emp
            );
        case 'loadingEmpresa':
            return action.payload;
        default:
            return state;
    }
}