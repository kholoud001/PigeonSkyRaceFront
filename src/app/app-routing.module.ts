import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnauthorizedComponent} from './modules/unauthorized/unauthorized.component';
import {RoleGuard} from './services/guards/role.guard';

const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/welcome/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'organizer',
    loadChildren: () => import('./modules/organizer/organizer.module').then(m => m.OrganizerModule),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ORGANIZER'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    redirectTo: '/user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
