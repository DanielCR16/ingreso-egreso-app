import { ActionReducerMap } from '@ngrx/store';
import * as ui from './ui.reducer';
import * as auth  from './auth.reducer';
import * as igeg  from './ingreso-egreso.reducer';

export interface AppState {
   ui:ui.State,
   user:auth.State,
   ingreso_egreso:igeg.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user:auth.authReducer,
   ingreso_egreso:igeg.ingresoEgresoReducer
}
