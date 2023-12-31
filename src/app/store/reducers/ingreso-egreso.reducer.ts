import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from '../actions/ingreso-egreso.actions';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from './app.reducer';


export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
  ingreso_egreso:State
}

export const initialState: State = {
  items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems , (state,{items}) => ({ ...state, items: [...items]})),
    on(unSetItems , (state) => ({ ...state, items: []})),
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
