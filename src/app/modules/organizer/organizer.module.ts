import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { ListCompetitionsComponent } from './list-competitions/list-competitions.component';
import { AddCompetitionsComponent } from './add-competitions/add-competitions.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    OrganizerComponent,

  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule
  ]
})
export class OrganizerModule { }
