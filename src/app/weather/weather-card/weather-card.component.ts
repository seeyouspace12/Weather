import {Component, Input, OnInit} from '@angular/core';
import {Coordinates, WeatherResponse} from "../../shared/models/weather";
import {WeatherService} from "../../core/services/weather.service";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input() coordinates?: Coordinates
  @Input() city?: string

  weather: WeatherResponse

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    if (this.coordinates) {
      this.weatherService.getWeather(this.coordinates).subscribe(res => this.weather = res);
    } else if (this.city) {
      this.weatherService.getCityData(this.city).pipe(
        mergeMap(coordinates => this.weatherService.getWeather(coordinates[0]))).subscribe(res => this.weather = res)
    }
  }
}
