import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonListService } from 'src/app/services/pokemon-list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit,OnDestroy {

  pokemon: any[] = []
  name: string| any
  id: string| any
  subscription!: Subscription

  constructor(private service: PokemonListService, private activatedroute: ActivatedRoute) {  }

  ngOnInit(): void {
    let params = this.activatedroute.snapshot.paramMap
    this.name = params.get("name")
    this.id = 0

    this.subscription = this.service.getUniquePokemon(this.name).subscribe(pokemon => this.pokemon.push(pokemon))
    // console.log(this.pokemon)

  }

  getType(pokemon: any): string {
    return this.service.getType(pokemon)
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
