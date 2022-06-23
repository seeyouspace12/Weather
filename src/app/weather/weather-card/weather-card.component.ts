import {Component, Input, OnInit} from '@angular/core';
import {WeatherResponse} from "../../shared/models/weather";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  constructor() { }

  @Input() weather: WeatherResponse;

  ngOnInit(): void {
  }
}
