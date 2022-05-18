import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';

import * as BookActions from './book.actions';
import { BookStoreService } from '../shared/book-store.service';



@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.bs.getAll().pipe(
        map(data => BookActions.loadBooksSuccess({ data })),
        catchError(error => of(BookActions.loadBooksFailure({ error }))),
      ))
    )
  })

  constructor(private actions$: Actions, private bs: BookStoreService) {}

}
