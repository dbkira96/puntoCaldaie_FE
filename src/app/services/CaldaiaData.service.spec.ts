/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaldaiaDataService } from './CaldaiaData.service';

describe('Service: CaldaiaData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaldaiaDataService]
    });
  });

  it('should ...', inject([CaldaiaDataService], (service: CaldaiaDataService) => {
    expect(service).toBeTruthy();
  }));
});
