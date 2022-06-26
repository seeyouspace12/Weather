import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
