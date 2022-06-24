import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherBoardComponent } from './weather-board/weather-board.component';
import { HttpClientModule } from "@angular/common/http";
import { WeatherCardComponent } from './weather-card/weather-card.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    WeatherBoardComponent,
    WeatherCardComponent
  ],
  exports: [
    WeatherBoardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class WeatherModule { }
