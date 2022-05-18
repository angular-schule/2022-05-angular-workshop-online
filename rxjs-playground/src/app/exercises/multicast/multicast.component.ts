import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, of, map, filter } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/

    // this.measureValues$ = this.mvs.getValues().pipe(share());

    this.measureValues$ = new BehaviorSubject(0);
    this.mvs.getValues().subscribe(this.measureValues$);

    /*setTimeout(() => {
      this.measureValues$.complete();
      console.log('FERTIG!');
      this.measureValues$.next(5555)
    }, 5000)

    setTimeout(() => {
      this.measureValues$.subscribe({
        next: e => console.log(e),
        complete: () => console.log('COMPLETE')
      });
    }, 7000)*/


    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
