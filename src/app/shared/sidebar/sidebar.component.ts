import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
constructor(private auth:AuthService,private router:Router){

}
  logout(){
    this.auth.logout().then(data=>{
      this.router.navigate(['/login']);
    });
  }
}
