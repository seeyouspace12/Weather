import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";

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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            console.log('position', position);
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.weatherService.getWeather({lat: position.coords.latitude, lon: position.coords.longitude}).subscribe(res => console.log('weather', res));
          }
        },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
