import { TestBed } from '@angular/core/testing';

import { BooksCatalogService } from './books-catalog.service';

describe('BooksCatalogServiceService', () => {
  let service: BooksCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
