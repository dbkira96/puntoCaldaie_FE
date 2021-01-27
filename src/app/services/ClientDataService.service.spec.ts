/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientDataServiceService } from './ClientDataService.service';

describe('Service: ClientDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientDataServiceService]
    });
  });

  it('should ...', inject([ClientDataServiceService], (service: ClientDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
