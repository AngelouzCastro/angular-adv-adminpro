import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {

  displayedColumns: string[] = ['nombre', 'email', 'role', 'google', 'opciones'];
  protected dataSource = new MatTableDataSource<any>;
  protected totalUsuarios: number = 0;
  protected pageSize: number = 10;
  protected pageIndex:number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private usuarioService: UsuarioService) {  }

  public ngOnInit() {
    this.loadUsuarios();
  }

  protected loadUsuarios() {
    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    this.usuarioService.getUsers(skip, limit)
      .subscribe( resp => {
        this.dataSource.data =  resp.usuarios;
        this.totalUsuarios = resp.total;
      },
      (err) => {
        console.log('el error =>' , err);
        
        Swal.fire('Error', err.error, 'error');
      } );
  }

  protected onPageChange( event: PageEvent ) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsuarios();
  }

  protected editUser(usuario: any) {
    console.log(usuario);
    
  }

}
