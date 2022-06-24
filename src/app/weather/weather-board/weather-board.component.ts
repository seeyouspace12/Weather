import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";
import {Coordinates, WeatherResponse} from "../../shared/models/weather";
import {FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../core/services/storage.service";
import {Subject} from "rxjs";

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

  cities$: Subject<string[]> = this.storageService.getCities();

  public ngOnInit(): void {
    this.getLocation();
  }

  addCityForm = new FormGroup({
    city: new FormControl(''),
  });

  mainCityCoords: Coordinates

  addCity() {
    this.storageService.addCity(this.addCityForm.getRawValue().city);
    this.addCityForm.controls.city.patchValue('')
  }

  public weather: WeatherResponse[] = [];

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            this.mainCityCoords = { lat: position.coords.latitude, lon: position.coords.longitude }
          }
        },
        (error: any) => console.log(error))
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

}
