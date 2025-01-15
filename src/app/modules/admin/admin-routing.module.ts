import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleGuard} from '../../services/guards/role.guard';
import {AdminComponent} from './welcome/admin.component';
import {ChangeUserRoleComponent} from './change-user-role/change-user-role.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';


const routes: Routes = [

  {
    path: '',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },

  { path: 'change-user-role',
    component: ChangeUserRoleComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN']}
  },
  { path: 'all-users',
    component: ManageUsersComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN']}
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
