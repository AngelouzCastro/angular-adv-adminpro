import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted = false;

  protected loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' ,[ Validators.required, Validators.email ]],
    password: ['' ,[ Validators.required]],
    remember: [false]    
  });

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone ){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  private googleInit(): void {

    google.accounts.id.initialize({
      client_id: environment.google_id,
      callback: ( response:any ) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } 
    );

    google.accounts.id.prompt(); 
  }

  handleCredentialResponse( response: any ): void {
    this.usuarioService.loginGoogle( response.credential )
    .subscribe( resp => {

      //navegar al Dashbiard
      this.router.navigateByUrl('/');
    },
    err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  protected login(): void {

    if ( this.loginForm.invalid ) {
      return;
    }

    this.usuarioService.login( this.loginForm.value )
        .subscribe( resp => {

          if ( this.loginForm.get('remember')?.value ) {
            const emailValue = this.loginForm.get('email')?.value;

            if (typeof emailValue === 'string') {
              localStorage.setItem('email', emailValue);
            }

          } else {
            localStorage.removeItem('email');
          }

          //navegar al Dashbiard
          this.router.navigateByUrl('/');
        }, (err) => {
          console.log(err);
          
          Swal.fire('Error', err, 'error');
        } );
  }
    

}
