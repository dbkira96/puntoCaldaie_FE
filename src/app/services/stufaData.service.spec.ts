/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StufaDataService } from './stufaData.service';

describe('Service: StufaData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StufaDataService]
    });
  });

  it('should ...', inject([StufaDataService], (service: StufaDataService) => {
    expect(service).toBeTruthy();
  }));
});
