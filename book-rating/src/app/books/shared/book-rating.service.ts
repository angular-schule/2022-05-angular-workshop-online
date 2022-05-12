import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() {}

  rateUp(book: Book): Book {
    /*let rating = book.rating;
    if (rating < 5) {
      rating++;
    }
    return { ...book, rating };*/

    return {
      ...book,
      rating: book.rating < 5 ? book.rating + 1 : 5
    }
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(1, book.rating - 1)
    }
  }
}
