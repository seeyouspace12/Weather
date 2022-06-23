import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherBoardComponent } from './weather-board/weather-board.component';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    WeatherBoardComponent
  ],
  exports: [
    WeatherBoardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class WeatherModule { }
