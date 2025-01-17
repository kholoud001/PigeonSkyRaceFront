import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';
import { AdminComponent } from './admin.component';
import {TranslatePipe} from "@ngx-translate/core";


@NgModule({
  declarations: [
    AdminComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslatePipe
    ]
})
export class AdminModule { }
