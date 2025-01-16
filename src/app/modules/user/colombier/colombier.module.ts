import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColombierRoutingModule } from './colombier-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    // ListComponent,
    // DetailsComponent
  ],
  imports: [
    CommonModule,
    ColombierRoutingModule
  ]
})
export class ColombierModule { }
