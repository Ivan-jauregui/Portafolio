import { TestBed } from '@angular/core/testing';
import { TecnologyService } from './tecnology-service';



describe('TecnologyServiceService', () => {
  let service: TecnologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
