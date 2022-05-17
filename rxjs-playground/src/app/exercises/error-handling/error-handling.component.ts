import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, timer, NEVER, Observable, share, merge } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry({ count: 5, delay: () => timer(2000) }),
      catchError(err => {
        // Fehler weiterwerfen
        // return new Observable((sub) => sub.error('HALLO'))
        // return throwError(() => 'FEHLER!');
        throw 'Böser Fehler!';

        // Fehler ersetzen
        // return of('Nichts', 'passiert!');

        // Fehler verschlucken / ignorieren
        // return of();
        // return NEVER;
        // return EMPTY;
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('COMPLETE')
    });
  }
}
