import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {TaskComponent} from './admin/task/task.component';
import {NewUserComponent} from './admin/new-user/new-user.component';
import {isAuthGuard} from '../core/services/isAuth.guard';

const routes: Routes = [
  {path : '', component: LoginComponent},
  {path:'admin',component:AdminComponent,canActivate:[isAuthGuard],children:[
    {path:'task',component:TaskComponent},
    {path:'new-user',component:NewUserComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
