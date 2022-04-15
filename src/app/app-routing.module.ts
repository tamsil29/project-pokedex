import { PokemonMovesComponent } from './components/pokemon-moves/pokemon-moves.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent 
  },
  {
    path: "pokemon-list",
    component: PokemonListComponent 
  },
  {
    path: "pokemon-info/:name",
    component: PokemonInfoComponent 
  },
  {
    path: "pokemon-moves/:name",
    component: PokemonMovesComponent 
  },
  {
    path: "**",
    component: NotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
