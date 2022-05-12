import { TestBed } from '@angular/core/testing';
import { Book } from './book';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    book = {
      isbn: '',
      description: '',
      price: 3,
      rating: 3,
      title: ''
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book', () => {});

  it('should rate down a book', () => {});

  it('should not rate higher than 5', () => {});

  it('should not rate lower than 1', () => {});
});
