import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const ratingMock: Partial<BookRatingService> = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [],
      providers: [
        // BRS ersetzen: Wenn BRS angefordert wird, wird stattdessen ratingMock ausgeliefert
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for doRateUp', () => {
    // Arrange
    const book: Book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 3
    };

    const rs = TestBed.inject(BookRatingService); // das ist eigentlich unser ratingMock
    spyOn(rs, 'rateUp').and.callThrough(); // rateUp überwachen, aber trotzdem alte Methode im Hintergrund verwenden

    // Act
    component.doRateUp(book);

    // Assert
    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
