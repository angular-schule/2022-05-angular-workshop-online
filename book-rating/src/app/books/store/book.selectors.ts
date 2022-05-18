import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectBooks = createSelector(
  selectBookState,
  (state) => state.books
);

export const selectLoading = createSelector(
  selectBookState,
  (state) => state.loading
);

export const selectBooksIsbn3 = createSelector(
  selectBooks,
  books => books.filter(b => b.isbn.startsWith('3'))
)


export const selectBooksForChartJS = createSelector(
  selectBooks,
  books => {
    // TODO
    return books;
  }
)

export function selectBooksIsbnStartsWith(char: string) {
  return createSelector(
    selectBooks,
    books => books.filter(b => b.isbn.startsWith(char))
  )
}
