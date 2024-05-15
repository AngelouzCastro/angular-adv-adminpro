import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  protected registerForm = this.fb.group({
    nombre: ['' ,[ Validators.required, Validators.minLength(3) ]],
    email: ['' ,[ Validators.required, Validators.email ]],
    password: ['' ,[ Validators.required, Validators.minLength(6) ]],
    passwordVerificacion: ['' ,[ Validators.required ]],
    terminos: [false ,[ Validators.required ]]
  }, {
    validators: this.passwordsIguales('password', 'passwordVerificacion')
  });

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService){}

  protected crearUsuario(): void {
    this.formSubmitted = true;
    

    if ( this.registerForm.invalid ) {
      return;
    }

    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          console.log('usuario creado');
          console.log(resp);
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        } );
  }

  protected campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  protected aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  protected compararContrasenas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('passwordVerificacion')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  private passwordsIguales(pass1Name: string, pass2Name: string) : (formGroup: FormGroup) => void {
    
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }


}
