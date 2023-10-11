import { Injectable } from '@angular/core';
import { Firestore, collection, doc,addDoc,getDoc,getDocs,collectionSnapshots,deleteDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:Firestore,private auth:AuthService) { }
  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){

    const userRef  = collection(this.firestore, `${this.auth.user.uid}`);
    const documentRef = doc(userRef, '/ingresos-egresos');
    const subNodo=collection(documentRef,'items')

  delete ingresoEgreso.uid;

    return addDoc(subNodo, {...ingresoEgreso})
  }

   initIngresosEgresosListener(uid:string){
    const userRef  = collection(this.firestore, `${uid}`);
    const documentRef = doc(userRef, '/ingresos-egresos');
    const subNodo=collection(documentRef,'items')

    return collectionSnapshots(subNodo).pipe(map(data=>data.map(doc=>({
      uid:doc.id,
      ...doc.data() as any
    }))));
  }
  borrarItem(uidItem:string){
    const uid=this.auth.user.uid;
    const docToDelete = doc(this.firestore, `${uid}`, '/ingresos-egresos','items', `${uidItem}`);
    return deleteDoc(docToDelete)
  }


}
