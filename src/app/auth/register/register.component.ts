import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { AuthService, dtoRegister } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
    formulario=this.fb.group({
      nombre:['',Validators.required],
      correo:['', [Validators.required, Validators.email]],
      password:['',Validators.required]
    })
  constructor(private fb:FormBuilder,private authService:AuthService,private routes:Router){

  }


  crearUsuario(){

    if(this.formulario.invalid)return;
    Swal.fire({
      title: 'Espere por favor',

      didOpen: () => {
        Swal.showLoading()

      }
    });
    const {correo,nombre,password}=this.formulario.value ?? { correo: '', nombre: '', password: '' };
   const dtoValidado:dtoRegister = {
  email:correo|| '',
  password:password|| '',
  usuario:nombre|| '',

   }
    this.authService.crearUsuario(dtoValidado)
     .then((userCredential)=>{
      Swal.close();
     this.routes.navigate(['/']);
     })
     .catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
     })
  }
}
