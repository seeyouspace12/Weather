import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Coordinates, WeatherResponse} from "../../shared/models/weather";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  public getWeather(params: Coordinates): Observable<WeatherResponse> {
    const queryParams = new HttpParams({fromObject: params as any});
    return this.http.get<WeatherResponse>(`https://fcc-weather-api.glitch.me/api/current`, {params: queryParams})
  }

  public getCityData(city?: string): Observable<Coordinates[]> {
    const queryParams = new HttpParams({fromObject: {city, format: 'json'} as any});
    return this.http.get<Coordinates[]>(`https://nominatim.openstreetmap.org/search`, {params: queryParams})
  }
}
