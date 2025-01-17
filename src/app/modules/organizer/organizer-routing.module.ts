import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleGuard} from '../../services/guards/role.guard';
import {OrganizerComponent} from './organizer.component';
import {ListCompetitionsComponent} from './list-competitions/list-competitions.component';
import {AddCompetitionsComponent} from './add-competitions/add-competitions.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ORGANIZER'] }
  },
  {
    path: 'competitions',
    component: ListCompetitionsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ORGANIZER'] }
  },
  {
    path: 'competition/add',
    component: AddCompetitionsComponent ,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ORGANIZER'] }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
