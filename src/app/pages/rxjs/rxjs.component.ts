import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   err => console.log('error:', err),
    //   () => console.log('obs terminado')      
    // );

    this.intervalSubs = this.retornaIntervalo()
      .subscribe( console.log )

  }
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
          .pipe(
            //psasan de forma ordenada
            // numero pipe === map === filter == true? take one : === return
            map ( valor =>  valor + 1),
            //se concatenean los operadores
            filter( valor => (valor % 2 === 0) ? true : false ),
            take(10),
          );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        //next es para emitir el valor
        observer.next(i);

        if ( i === 4 ) {
          //cancela setinterval
          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 2 ) {
          console.log('i es igual a 2 xd');
          observer.error('i llego al valor de 2');
        }
        
      }, 1000 );

    });
  }

}
