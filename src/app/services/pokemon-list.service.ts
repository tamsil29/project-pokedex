import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  url = environment.BASE_URL + 'pokemon';
  pokemons: any[] | any

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset:number){
    return this.http.get(this.url + `?limit=${limit}&offset=${offset}`);
  }

  getUniquePokemon(name: string):Observable<any>{
    return this.http.get(this.url + `/${name}`)
  }

  getType(pokemon: any): string {
    let checkType = pokemon.types[0].type.name
    return pokemon && pokemon.types.length > 0 ? checkType : '';
  }
}
