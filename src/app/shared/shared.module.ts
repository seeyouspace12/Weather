import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAlertComponent } from './modal-dialogs/simple-alert/simple-alert.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SimpleAlertComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SharedModule { }
