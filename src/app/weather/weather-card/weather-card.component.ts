import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Coordinates, WeatherResponse} from "../../shared/models/weather";
import {WeatherService} from "../../core/services/weather.service";
import {mergeMap, Subject, take, takeUntil} from "rxjs";
import {StorageService} from "../../core/services/storage.service";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() coordinates?: Coordinates
  @Input() city?: string

  weather: WeatherResponse
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    if (this.coordinates) {
      this.weatherService.getWeather(this.coordinates).pipe(
        takeUntil(this.destroy$),
      ).subscribe(res => this.weather = res);
    } else if (this.city) {
      this.weatherService.getCityData(this.city).pipe(
        take(1),
        mergeMap(coordinates => this.weatherService.getWeather(coordinates[0]))
      ).subscribe(res => this.weather = res)
    }
  }

  removeCity(): void {
    this.storageService.removeCity(this.city);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
