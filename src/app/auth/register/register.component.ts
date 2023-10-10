import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { AuthService, dtoRegister } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/store/actions/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {
  cargando:boolean=false;
  subscriptions$:Subscription;
    formulario=this.fb.group({
      nombre:['',Validators.required],
      correo:['', [Validators.required, Validators.email]],
      password:['',Validators.required]
    })
  constructor(private fb:FormBuilder,private authService:AuthService,private routes:Router,private store:Store<AppState>){

  }
  ngOnDestroy(): void {
this.subscriptions$.unsubscribe();
  }
  ngOnInit(): void {
   this.subscriptions$=this.store.select('ui').subscribe(data=>this.cargando=data.isLoading);
  }


  crearUsuario(){

    if(this.formulario.invalid)return;
    this.store.dispatch(isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',

    //   didOpen: () => {
    //     Swal.showLoading()

    //   }
    // });
    const {correo,nombre,password}=this.formulario.value ?? { correo: '', nombre: '', password: '' };
   const dtoValidado:dtoRegister = {
  email:correo|| '',
  password:password|| '',
  usuario:nombre|| '',

   }
    this.authService.crearUsuario(dtoValidado)
     .then((userCredential)=>{
      this.store.dispatch(stopLoading());
      //Swal.close();
     this.routes.navigate(['/']);
     })
     .catch((err)=>{
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
     })
  }
}
