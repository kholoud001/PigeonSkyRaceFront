import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigeonRoutingModule } from './pigeon-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import {FormsModule} from '@angular/forms';
import { AddPigeonComponent } from './add-pigeon/add-pigeon.component';
import { UpdatePigeonComponent } from './update-pigeon/update-pigeon.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,

  ],
  imports: [
    CommonModule,
    PigeonRoutingModule,
    FormsModule
  ]
})
export class PigeonModule { }
