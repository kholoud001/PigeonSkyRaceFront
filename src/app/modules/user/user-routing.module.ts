import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user.component';
import {RoleGuard} from '../../services/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_USER'] }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
