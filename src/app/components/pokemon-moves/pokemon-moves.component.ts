import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonListService } from 'src/app/services/pokemon-list.service';

@Component({
  selector: 'app-pokemon-moves',
  templateUrl: './pokemon-moves.component.html',
  styleUrls: ['./pokemon-moves.component.css']
})
export class PokemonMovesComponent implements OnInit {

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
    console.log(this.pokemon)

  }

  getType(pokemon: any): string {
    return this.service.getType(pokemon)
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
