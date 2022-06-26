import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
