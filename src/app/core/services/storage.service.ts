import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  cities$: Subject<string[]> = new BehaviorSubject([]);

  addCity(cityName: string): void {
    let cityList = JSON.parse(localStorage.getItem('cities'))
    if (!cityList) {
      cityList = [];
    }
    cityList.push(cityName)
    this.cities$.next(cityList);
    localStorage.setItem('cities', JSON.stringify(cityList))
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
