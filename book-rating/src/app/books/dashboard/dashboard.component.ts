import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Book, trackBook } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectBooks } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService, private store: Store) {
    /*this.bs.getAll().subscribe(books => {
      this.books = books;
    });*/
    // TODO: AsyncPipe
    this.store.select(selectBooks).subscribe(books => {
      this.books = books;
    });;

    this.store.dispatch(loadBooks());
  }

  ngOnInit(): void {}

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books.map(book => {
      if (book.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return book;
      }
    });

    // this.books = this.books.map(book => book.isbn === ratedBook.isbn ? ratedBook : book);

    /*const copiedList = [...this.books];
    copiedList[i] = ratedBook;
    this.books = copiedList;*/

    // [1,2,3,4,5,6,7].filter(e => e > 3); // [4,5,6,7]
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
  }

  trackBook = trackBook;
}

