import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;
const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( 
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  public logOut(): void {
    localStorage.removeItem('token');

    // if (this.auth2) {
    //   this.auth2.signOut().then(() => {
  
    //     this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
    //     });
    //   });
    // } else {
    //   console.warn("this.auth2 is undefined");
    // }
  }

  public validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get( `${ base_url}/login/renew`, {
      headers: {
        'token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true ),
      catchError( error => of(false)) 
    );
  }

  public crearUsuario( formData: RegisterForm ) {

    return this.http.post( `${ base_url }/usuarios`, formData )
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      })
    );
    
  }

  public getUsers( desde: number = 0, limit: number = 5 ) {
    const token = localStorage.getItem('token') || '';

    let params = new HttpParams();
    params = params.append('desde', desde.toString());
    params = params.append('limit', limit.toString());

    return this.http.get( `${ base_url }/usuarios`,{ params })
    .pipe(
      //modificar/transformar la respuesta ante de llegar al componente
      map( (resp:any) => {
        return {
          usuarios: resp['usuarios'],
          total: resp['total']
        }
      }),
      //manejar error
      catchError( this.manejarError )
    );
    
  }

  public login( formData: any ) {
    
    return this.http.post( `${ base_url }/login`, formData )
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      catchError( this.manejarError )
    );

  }

  public loginGoogle( token: string ) {
    return this.http.post( `${ base_url }/login/google`, { token })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      })
    );
  }

  private manejarError( error: HttpErrorResponse ): Observable<never> {
    console.log('sucedio un error');
    console.warn(error);
    return throwError('Error al tratar de obtener los datos');
  }

}
