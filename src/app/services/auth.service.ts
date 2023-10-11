import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import {Firestore, addDoc, collection,doc,getDoc,setDoc,docSnapshots } from "@angular/fire/firestore";
import { Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../store/actions/auth.actions';
import { unSetItems } from '../store/actions/ingreso-egreso.actions';
export interface dtoRegister {
  usuario:string ,
  email:string,
  password:string ,
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private _user:Usuario;
 userSubscription:Subscription;
  constructor(private firebaseAuthenticationService:AngularFireAuth,
    private firestore:Firestore,
    private store:Store<AppState>
    ) { }
    get user(){
      return this._user;
    }

  initAuthListener(){
    this.firebaseAuthenticationService.authState.subscribe(async fuser=>{
      if(fuser){
        const docRef = doc(this.firestore,`${fuser?.uid}`, "usuario");
        const docSnap =  docSnapshots(docRef).pipe(map(data=>data.data())).subscribe((data:any)=>{
          const user= Usuario.fromFirebase(data)
          this._user=user;
          this.store.dispatch(setUser({user:user} ))
        });
      }
      else{
        this._user=null;
        this.store.dispatch(unSetUser( ));
        this.store.dispatch(unSetItems( ));
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
