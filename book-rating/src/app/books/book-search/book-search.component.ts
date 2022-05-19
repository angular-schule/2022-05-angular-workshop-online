import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('', { initialValueIsDefault: true });
  results$: Observable<Book[]>;
  isLoading = false;

  constructor(private bs: BookStoreService) {

    this.results$ = this.searchControl.valueChanges.pipe(
      filter(term => term.length >= 3),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(term => this.bs.search(term)),
      tap(() => this.isLoading = false),
    );


    /* TODO:
    - Suchbegriff mindestens 3 Zeichen lang (mit RxJS!)
    - erst abschicken, wenn NUtzer für bestimmte Zeit die Finger stillgehalten hat
    - für jeden Suchbegriff HTTP-Request machen
    - Ergebnisse (ganz einfach!)
    - AsyncPipe
    - Zusatzaufgabe: Ladeindikator (z.B. mit tap)
    */
  }

  ngOnInit(): void {
  }


}
