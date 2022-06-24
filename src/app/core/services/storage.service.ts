import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addCity(cityName: string): void {
    let previousCities = JSON.parse(localStorage.getItem('cities'))
    if (!previousCities) {
      previousCities = [];
    }
    previousCities.push(cityName)
    localStorage.setItem('cities', JSON.stringify(previousCities))
  }
}
