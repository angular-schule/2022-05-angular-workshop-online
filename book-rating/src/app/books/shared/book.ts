export interface Book {
  isbn: string;
  title: string;
  description: string;
  // authors: string[];
  rating: number;
  price: number;
}


export function trackBook(index: number, item: Book) {
  return item.isbn;
}
