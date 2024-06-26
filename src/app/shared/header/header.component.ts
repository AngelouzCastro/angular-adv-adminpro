import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor( private usuarioService: UsuarioService ) {}

  protected logOut() {
    this.usuarioService.logOut();
  }

}
