import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {ListComponent} from './list/list.component';
import {AddPigeonComponent} from './add-pigeon/add-pigeon.component';
import {UpdatePigeonComponent} from './update-pigeon/update-pigeon.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add', component: AddPigeonComponent },
  { path: 'update/:id', component: UpdatePigeonComponent },
  { path: ':id', component: DetailsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigeonRoutingModule { }
