import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent {

  ngOnInit(): void {

    //lo mas normal es usarlas cuando manejamos algo a destiempo
    // const promesa = new Promise(  ( resolve, reject ) => {

    //   if ( false ) {
    //     resolve('hola mundo');
    //   } else {
    //     reject('aglgo salio mal');
    //   }
    // });

    // promesa
    // .then( ( mensaje ) => {
    //   console.log(mensaje);

    // })
    // .catch( error => console.log('error en la promesa => ', error));

    this.getUsuario().then( usuarios => {
      console.log(usuarios);
      
    })
    console.log('fin de init');
    
  }

  getUsuario(): Promise<unknown> {

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ) );
    })

  }

}
