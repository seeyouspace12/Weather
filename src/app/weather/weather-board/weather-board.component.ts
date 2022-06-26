import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../core/services/weather.service";
import {Coordinates, WeatherResponse} from "../../shared/models/weather";
import {FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../core/services/storage.service";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SimpleAlertComponent} from "../../shared/modal-dialogs/simple-alert/simple-alert.component";

@Component({
  selector: 'app-weather-board',
  templateUrl: './weather-board.component.html',
  styleUrls: ['./weather-board.component.css']
})
export class WeatherBoardComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {
  }

  cities$: Subject<string[]> = this.storageService.getCities()

  page: number = 1
  perPage: number = 4
  total: number
  totalPages: number

  errorMessage: string = null

  ngOnInit(): void {
    this.getLocation()
    this.cities$.subscribe(cities => {
      this.checkLastOnPage(cities?.length)
      this.total = cities?.length
      this.totalPages = Math.ceil(cities?.length / this.perPage)
    })
  }

  checkLastOnPage(total): void {
    if (this.page * this.perPage - (this.perPage - 1) > total && this.page === this.totalPages && total > 1) {
      this.prevPage()
    }
  }

  addCityForm = new FormGroup({
    city: new FormControl(''),
  });

  mainCityCoords: Coordinates

  addCity() {
    this.storageService.addCity(this.addCityForm.getRawValue().city)
      .subscribe(res => {
        if (!res) {
          this.errorMessage = 'City not found'
          return
        } else {
          this.errorMessage = null
        }
        this.addCityForm.controls.city.patchValue('')
      })
  }

  trackByFn(index) {
    return index;
  }

  weather: WeatherResponse[] = [];

  private getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            console.log('position', position)
            this.mainCityCoords = {lat: position.coords.latitude, lon: position.coords.longitude}
          }
        },
        () => {
          this.dialog.open(SimpleAlertComponent, {
            height: '300px',
            width: '600px',
            data: 'Please allow geolocation and reload the page'
          });
        })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  nextPage(): void {
    this.page++
  }


  prevPage(): void {
    this.page--
  }

}
