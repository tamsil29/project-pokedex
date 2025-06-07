import { ActivatedRoute, Router } from '@angular/router';
import { PokemonListService } from './../../services/pokemon-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  config: any;
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  pageSize = 20;
  filterTerm!: string;
  sub: Subscription;

  constructor(
    private service: PokemonListService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: this.pageSize,
      totalItems: this.pageSize,
    };

    this.sub = this.route.queryParamMap
      .pipe(map((params) => params.get('page')))
      .subscribe(async (page) => {
        console.log({ page });
        this.config.currentPage = page;
        await this.getPokemons();
      });
  }

  async ngOnInit(): Promise<void> {
    await this.getPokemons();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  async getPokemons() {
    const res = (await this.service
      .getPokemons(this.pageSize, (this.config.currentPage - 1) * this.pageSize)
      ?.toPromise()) as any;
    this.config.totalItems = res.count;
    const pokemons: any[] = [];
    res?.results?.forEach((pok: any) => {
      this.service
        .getUniquePokemon(pok.name)
        ?.toPromise()
        ?.then((upok) => pokemons.push(upok));
    });
    this.filteredPokemons = pokemons;
  }

  getType(pokemon: any): string {
    return this.service.getType(pokemon);
  }

  // filter(filterTerm: string){
  //   this.filteredPokemons = (filterTerm) ?
  //   this.pokemons.filter(pokemon => pokemon.name.includes(this.filterTerm)) : this.pokemons
  // }

  async filter(filterTerm: string) {
    if (filterTerm) {
      this.config.currentPage = 1;
      this.filteredPokemons = [];
      const res = (await this.service.getPokemons(1302, 0)?.toPromise()) as any;
      const matchedPokii = res?.results?.filter((pokemon: any) =>
        pokemon.name.includes(this.filterTerm.toLocaleLowerCase())
      );

      this.config.itemsPerPage = matchedPokii.length;
      this.config.totalItems = matchedPokii.length;
      matchedPokii?.forEach(async (pok: any) => {
        this.service
          .getUniquePokemon(pok.name)
          ?.toPromise()
          ?.then((upok) => this.filteredPokemons.push(upok));
      });
    } else {
      this.config.currentPage = this.route.snapshot.queryParamMap.get('page');
      await this.getPokemons();
    }
  }

  pageChange(newPage: number) {
    this.router.navigate(['/pokemon-list'], { queryParams: { page: newPage } });
  }
}
