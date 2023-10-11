import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../store/actions/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {
  userSubs$:Subscription;
  ingresosSubs:Subscription;
  constructor(private store:Store<AppState>,private igeg:IngresoEgresoService){

  }
  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
    this.userSubs$.unsubscribe();

  }
  ngOnInit(): void {
this.userSubs$=this.store.select('user').pipe(
  filter(auth=>auth.user!=null)
).subscribe(({user})=>{
  this.ingresosSubs=this.igeg.initIngresosEgresosListener(user.uid).subscribe(data=>{
    this.store.dispatch(setItems({items:data}))
  })
})
  }

}
