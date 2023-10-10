import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import {Firestore, addDoc, collection,doc,getDoc,setDoc } from "@angular/fire/firestore";
import { Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../store/actions/auth.actions';
export interface dtoRegister {
  usuario:string ,
  email:string,
  password:string ,
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {
 userSubscription:Subscription;
  constructor(private firebaseAuthenticationService:AngularFireAuth,
    private firestore:Firestore,
    private store:Store<AppState>
    ) { }

  initAuthListener(){
    this.firebaseAuthenticationService.authState.subscribe(async fuser=>{
      if(fuser){
        const docRef = doc(this.firestore,`${fuser?.uid}`, "usuario");
        const docSnap = await getDoc(docRef);
        console.log("hola",docSnap.data())
        const user= Usuario.fromFirebase({email:docSnap.data()['email'],nombre:docSnap.data()['uid'],uid:docSnap.data()['nombre']} )
        this.store.dispatch(setUser({user:user} ))
      }
      else{
        this.store.dispatch(unSetUser( ));
      }

    })
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
