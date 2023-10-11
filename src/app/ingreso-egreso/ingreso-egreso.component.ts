import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../store/actions/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
  subscriptions$:Subscription;
  isLoading :boolean=false;
  tipo      :string='ingreso'
  formEgresoIngreso = this.fb.group({
    descripcion:['',Validators.required],
    monto:[0,Validators.required]
  })

  constructor(private fb:FormBuilder,private ingresoEgreso:IngresoEgresoService,private store:Store<AppState> ){

  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions$= this.store.select('ui').subscribe(({isLoading})=>this.isLoading=isLoading)
    }
  guardar(){
    this.store.dispatch(isLoading());

    if(this.formEgresoIngreso.invalid)return;
    const {descripcion,monto} = this.formEgresoIngreso.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo)
    this.ingresoEgreso.crearIngresoEgreso(ingresoEgreso)
    .then(()=>
    {
      this.formEgresoIngreso.reset();
      this.store.dispatch(stopLoading())
      Swal.fire('Registro Creado',descripcion,'success')
    })
    .catch(err=>{
      this.store.dispatch(stopLoading())
      Swal.fire('Error',err.message,'error')
    });
  }
}
