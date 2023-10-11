import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { routesChildren } from './dashboard.routes';
import { authGuard } from '../services/auth.guard';


export const rutasHijas: Routes = [
  {

     path:'',component:DashboardComponent,
     children:routesChildren,
   //  canActivate:[authGuard]

},

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(rutasHijas)],
})
export class DashboardRoutesModule { }
