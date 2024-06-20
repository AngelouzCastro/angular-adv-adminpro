import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JWTIterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'token': token
    });

    const reqClone = req.clone({
      headers
    })    
    
     return next.handle( reqClone ).pipe(
      catchError( this.manejarError )
     );
  }
  
  private manejarError( error: HttpErrorResponse ): Observable<never> {
    console.log('sucedio un error');
    console.warn(error);
    return throwError('Error al tratar de obtener los datos');
  }
}
