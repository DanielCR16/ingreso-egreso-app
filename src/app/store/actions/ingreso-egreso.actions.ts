import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

export const setItems = createAction('[IngresoEgreso] Set Items',props<{items:IngresoEgreso[]}>());
export const unSetItems = createAction('[IngresoEgreso] Un Set Items');
