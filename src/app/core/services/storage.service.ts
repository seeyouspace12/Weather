import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, Subject, take} from "rxjs";
import {WeatherService} from "./weather.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private weatherService: WeatherService
  ) {
  }

  cities$: Subject<string[]> = new BehaviorSubject([]);

  addCity(cityName: string): Observable<boolean> {
    let cityList = JSON.parse(localStorage.getItem('cities'))
    if (!cityList) {
      cityList = [];
    }
    cityList.push(cityName)
    return this.weatherService.getCityData(cityName)
      .pipe(
        take(1),
        map(res => {
          console.log('serviceres', !!res.length)
          if (!!res.length) {
            localStorage.setItem('cities', JSON.stringify(cityList))
            this.cities$.next(cityList);
          }
          return !!res.length
        })
      )
  }

  getCities(): Subject<string[]> {
    this.cities$.next(JSON.parse(localStorage.getItem('cities')));
    return this.cities$;
  }

  removeCity(cityName): void {
    this.cities$
      .pipe(take(1))
      .subscribe(cities => {
        const newCities = cities.filter(city => city !== cityName);
        this.cities$.next(newCities);
        localStorage.setItem('cities', JSON.stringify(newCities))
      })
  }
}
