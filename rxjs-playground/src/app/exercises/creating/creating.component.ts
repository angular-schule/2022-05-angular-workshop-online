import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/



    // of('Angular', 'Vue', 'React')
    // from(['A', 'B', 'C'])
    // interval(1000) // ---0---1---2---3---4--- ...
    // timer(3000) // ---------0|
    // timer(3000, 1000) // ---------0---1---2---3---4--- ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/


    function producer(sub: any) {
      const result = Math.random();
      sub.next(result);
      sub.next(6);

      const iii = setInterval(() => {
        // cberr('FEHLER!');
        console.log('TIMER');
        sub.next(Math.random());
      }, 1000);

      // Teardown Logic
      return () => {
        clearInterval(iii);
      };
    }

    const obs = {
      next: (e: any) => console.log(e),
      // error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG!')
    };

    // producer(obs);
    // Finnische Notation $
    // const myObs$ = new Observable(producer);
    // const sub = myObs$.subscribe(obs);

    setTimeout(() => {
      // sub.unsubscribe();
    }, 5000)


    /*class MyObservable {
      constructor(private producer: any) {}

      subscribe(observer: any) {
        const subscriber = this.sanitizeObserver(observer);
        this.producer(subscriber);
      }
    }*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
