import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, shareReplay, timer } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  // Beispiel: Polling
  books$ = timer(0, 10000).pipe(
    exhaustMap(() => this.getAll()),
    shareReplay(1)
  );

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) {
    // this.books$.subscribe();
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/books/' + isbn);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + '/books', book);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books/search/' + term);
  }
}
