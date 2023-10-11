import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AppStateWithIngreso } from 'src/app/store/reducers/ingreso-egreso.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy{
  ingresosEgresos:IngresoEgreso[]=[];
  ingresosSubs$:Subscription;
constructor(private store:Store<AppStateWithIngreso>,private ingresoEgreso:IngresoEgresoService){

}
  ngOnDestroy(): void {
   this.ingresosSubs$.unsubscribe();
  }
  ngOnInit(): void {
this.ingresosSubs$=this.store.select('ingreso_egreso').subscribe(({items})=>this.ingresosEgresos=items)
}

borrar(dato){
this.ingresoEgreso.borrarItem(dato).then(()=>Swal.fire("Borrado","Item Borrado","success"))
.catch(err=>Swal.fire("Borrado",err.message,"success"))
}
}
