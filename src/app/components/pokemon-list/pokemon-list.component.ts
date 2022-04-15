import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListService } from './../../services/pokemon-list.service';
import { Component, OnInit } from '@angular/core';
import { map} from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  config: any;
  pokemons: any[] = [];
  filteredPokemons: any[] = []
  page = 1;
  pageSize= 21;
  totalPokemons!: number;
  filterTerm!: string;

  constructor(private service: PokemonListService, private route: ActivatedRoute, private router: Router) { 
    this.config ={
      currentPage: 1,
      itemsPerPage: this.pageSize,
      totalItems: this.totalPokemons
    }

    this.route.queryParamMap
      .pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons(){
    this.service.getPokemons(1126, this.page + 0).subscribe((response: any) => {
      this.totalPokemons = response.count;
      this.filteredPokemons = this.pokemons
      console.log(this.totalPokemons)

      response.results.forEach((pokemon: any) => {
        this.service.getUniquePokemon(pokemon.name)
        .subscribe((uniquePokemon: any) => {
          this.pokemons.push(uniquePokemon);
          // console.log(this.pokemons)
        })
      })
    })
  }

  getType(pokemon: any): string {
    return this.service.getType(pokemon);
  }

  // filter(filterTerm: string){
  //   this.filteredPokemons = (filterTerm) ? 
  //   this.pokemons.filter(pokemon => pokemon.name.includes(this.filterTerm)) : this.pokemons
  // }

  filter(filterTerm: string){
    if (filterTerm){
      this.config.currentPage = 1
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.filterTerm.toLocaleLowerCase()))
    }
    else{
      this.route.queryParamMap.pipe(map(params=> params.get('page')))
      .subscribe(page => this.config.currentPage = page);
      this.filteredPokemons = this.pokemons
    }
  }

  pageChange(newPage: number) {
		this.router.navigate(['/pokemon-list'], { queryParams: { page: newPage } });
	}

}

