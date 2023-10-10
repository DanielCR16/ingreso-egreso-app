import { Component } from '@angular/core';
import{FormBuilder,Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  formularioLogin=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
constructor(private fb:FormBuilder,private auth:AuthService,private routes:Router){}
login(){
if(this.formularioLogin.invalid)return;

Swal.fire({
  title: 'Espere por favor',

  didOpen: () => {
    Swal.showLoading()

  }
});

const {email,password}=this.formularioLogin.value;
const validEmail:string=email || "";
const validPass:string=password || "";
this.auth.loginUsuario(validEmail,validPass)
.then(data=> {
  Swal.close();   this.routes.navigate(['/']);
} )
.catch(err=>Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: err.message,
}))
}
}
