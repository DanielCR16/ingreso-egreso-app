import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import {Firestore, addDoc, collection,doc,setDoc } from "@angular/fire/firestore";
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
export interface dtoRegister {
  usuario:string ,
  email:string,
  password:string ,
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private firebaseAuthenticationService:AngularFireAuth,
    private firestore:Firestore
    ) { }

  initAuthListener(){
    this.firebaseAuthenticationService.authState
  }
  crearUsuario(dtoRegistro:dtoRegister){
    const { usuario, email, password }= dtoRegistro;

 return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email,password)
 .then(({user})=>{
  const newUser = new Usuario(user!.uid,usuario,user!.email!)
  const userRef  = collection(this.firestore, `${user?.uid}`);
  const documentRef = doc(userRef, 'usuario');

  return setDoc(documentRef, {...newUser})
 });

  }
  loginUsuario(email:string,password:string){
   return this.firebaseAuthenticationService.signInWithEmailAndPassword(email,password)
  }
  logout(){
    return this.firebaseAuthenticationService.signOut();
  }
  isAuth(){
    return this.firebaseAuthenticationService.authState.pipe(
      map(fbUser=>fbUser!=null)
    );
  }
}
