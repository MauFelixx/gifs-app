import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'nvFRWMoRDd3ZjY7Jd1DCb3xjG903AE5C';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]; //!Operador Spear
  }

  constructor( private http: HttpClient){

    //*Mantiene los resultados buscados despues de recargar el navegador web
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /*if(localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }*/
  }

  buscarGifs( query: string = ''){
    
    query = query.trim().toLocaleLowerCase(); //!trim() controla espacios delante y detras del string

    if( !this._historial.includes( query )){ //*Si la busqueda existe no inserta
      this._historial.unshift( query ); //*Inserta busqueda en el historial
      this._historial = this._historial.splice(0,10); //*Limitar historial de búsqueda

      localStorage.setItem('historial', JSON.stringify( this._historial )); //*Mantener la busqueda en el navegador
      
    }
    
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    //*Llamado
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( ( resp  ) => {
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify( this.resultados ));
    });

  }
}
