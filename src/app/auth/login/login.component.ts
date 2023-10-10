import { Component, OnDestroy, OnInit } from '@angular/core';
import{FormBuilder,Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from 'src/app/store/actions/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit,OnDestroy {
  cargando:boolean=false;
  subscriptions$:Subscription;
  formularioLogin=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
constructor(private fb:FormBuilder,private auth:AuthService,private routes:Router,private store:Store<AppState>){}
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  ngOnInit(): void {
  this.subscriptions$= this.store.select('ui').subscribe(ui=>this.cargando=ui.isLoading)
  }
login(){
if(this.formularioLogin.invalid)return;
  this.store.dispatch(isLoading());

// Swal.fire({
//   title: 'Espere por favor',

//   didOpen: () => {
//     Swal.showLoading()

//   }
// });

const {email,password}=this.formularioLogin.value;
const validEmail:string=email || "";
const validPass:string=password || "";
this.auth.loginUsuario(validEmail,validPass)
.then(data=> {
  // Swal.close();
  this.store.dispatch(stopLoading());
  this.routes.navigate(['/']);
} )
.catch(err=>{
  this.store.dispatch(stopLoading());
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: err.message,
})
}
)
}
}
