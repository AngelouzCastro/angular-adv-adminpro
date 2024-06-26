import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { UsuarioService } from "../services/usuario.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( 
        private usuarioService: UsuarioService,
        private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.usuarioService.validarToken().pipe(
            tap( estaAutenticado => {
                if ( !estaAutenticado ) {
                    this.router.navigateByUrl('/login');
                }
            })
        );
    }
}