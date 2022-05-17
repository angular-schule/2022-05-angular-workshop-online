import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of, map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => {
        console.log({ acc, item });
        return acc + item;
      }, 0)
    ).subscribe(score => {
      this.currentScore = score;
    });

    // [1,2,3,4,5].reduce((acc, item) => acc + item, 0) // 15

    /******************************/

    // Exkurs: Redux-Pattern
    const state$ = of(
      'SETFRAMEWORKANGULAR',
      'SETCITYBREMEN',
      'SETNAMEFERDINAND', // { type: 'Set name', data: 'Ferdinand' }
      'SETCITYHAMBURG'
    ).pipe(
      scan((state, msg) => {
        switch (msg) {
          case 'SETNAMEFERDINAND': return { ...state, name: 'Ferdinand', city: 'Leipzig' };
          case 'SETFRAMEWORKANGULAR': return { ...state, framework: 'Angular' };
          case 'SETCITYHAMBURG': return { ...state, city: 'Hamburg' };
          case 'SETCITYSTUTTGART': return { ...state, city: 'Stuttgart' };
          default: return state;
        }
      }, { name: 'Georg', city: 'München' })
    );

    const name$ = state$.pipe(
      map(state => state.name),
      distinctUntilChanged()
    );
    name$.subscribe(console.log)


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
