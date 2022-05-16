import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl(''),
    rating: new FormControl(1, [
      Validators.min(1),
      Validators.max(5),
    ]),
    price: new FormControl(0, Validators.min(0)),
  });

  constructor(private bs: BookStoreService, private router: Router) { }

  ngOnInit(): void {
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    /*if(!control) {
      throw new Error('Control not found!');
    }*/
    return !!control && control.touched && control.invalid;
    // return !!(control?.touched && control?.invalid);
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched;
    // return !!control && !!control.errors?.[errorCode] && control.touched;
  }

  submitForm() {
    // this.bookForm.value // nur aktivierte Felder
    // this.bookForm.getRawValue() // alle Felder, auch deaktivierte

    const formValue: Book = this.bookForm.value;
    this.bs.create(formValue).subscribe(receivedBook => {
      // zur Detailseite
      this.router.navigate(['/books', receivedBook.isbn]); // Array von Segmenten
      // zum Dashboard
      // this.router.navigateByUrl('/books'); // string
    })
  }

}

/*
TODO:
- Validierung ✅
- Feedback ✅
- Submit-Button
- Abschicken
- HTTP bs.create()
- bei Erfolg: Navigation zu Detailseite
*/
