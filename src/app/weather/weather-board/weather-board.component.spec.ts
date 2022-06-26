import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBoardComponent } from './weather-board.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

describe('WeatherBoardComponent', () => {
  let component: WeatherBoardComponent;
  let fixture: ComponentFixture<WeatherBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherBoardComponent ],
      providers: [HttpClient, HttpHandler, {provide: MatDialog, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
