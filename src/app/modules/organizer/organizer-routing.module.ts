import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleGuard} from '../../services/guards/role.guard';
import {OrganizerComponent} from './organizer.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ORGANIZER'] }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
