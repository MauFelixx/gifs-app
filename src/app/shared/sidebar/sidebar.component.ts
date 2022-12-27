import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){
    return this.gisfService.historial;
  }

  constructor(private gisfService: GifsService){}

  //*Obtener gifs desde sidebar
  buscar( termino: string ) {
    this.gisfService.buscarGifs(termino);
  }
}
