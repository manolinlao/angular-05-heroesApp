import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    //al poner este return, regresa un Observable que regresa un objeto
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId( id: string ):Observable<Heroe>{
    console.log(id);
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${ id }`);
  }

  getSugerencias( termino: string ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes/?q=${ termino }&_limit=${ 6 }`);
  }

  agregarHeroe( heroe: Heroe ):Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes/`,heroe)
  }

  actualizarHeroe( heroe: Heroe ):Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`,heroe)
  }

}
