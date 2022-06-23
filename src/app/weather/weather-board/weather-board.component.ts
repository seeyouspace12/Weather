import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";
import {WeatherResponse} from "../../shared/models/weather";

@Component({
  selector: 'app-weather-board',
  templateUrl: './weather-board.component.html',
  styleUrls: ['./weather-board.component.css']
})
export class WeatherBoardComponent implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) { }

  public ngOnInit(): void {
    this.getLocation();
  }

  public weather: WeatherResponse[] = [];

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            this.weatherService.getWeather({lat: position.coords.latitude, lon: position.coords.longitude}).subscribe(res => this.weather.push(res));
          }
        },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
