import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";
import {WeatherResponse} from "../../shared/models/weather";
import {FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../core/services/storage.service";

@Component({
  selector: 'app-weather-board',
  templateUrl: './weather-board.component.html',
  styleUrls: ['./weather-board.component.css']
})
export class WeatherBoardComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) { }

  public ngOnInit(): void {
    this.getLocation();
  }

  addCityForm = new FormGroup({
    city: new FormControl(''),
  });

  addCity() {
    this.storageService.addCity(this.addCityForm.getRawValue().city);
    this.addCityForm.controls.city.patchValue('')
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
