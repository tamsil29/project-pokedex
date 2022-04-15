import { PokemonListService } from './services/pokemon-list.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { PokemonMovesComponent } from './components/pokemon-moves/pokemon-moves.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PokemonListComponent,
    PokemonInfoComponent,
    NotFoundComponent,
    PokemonMovesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  providers: [
    PokemonListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
