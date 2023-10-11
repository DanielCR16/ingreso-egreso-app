import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit,OnDestroy{
  userName:string="";
  userSubs$:Subscription;
constructor(private auth:AuthService,private router:Router,private store:Store<AppState>){

}
  ngOnDestroy(): void {
    this.userSubs$.unsubscribe();
  }
  ngOnInit(): void {
   this.userSubs$=this.store.select('user').pipe(filter(({user})=>user!=null)).subscribe(({user})=>{
    this.userName=user?.nombre
   })
  }
  logout(){
    this.auth.logout().then(data=>{
      this.router.navigate(['/login']);
    });
  }
}
