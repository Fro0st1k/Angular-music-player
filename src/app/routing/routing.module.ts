import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerContentComponent } from '../components/player-content/player-content.component';
import { PlayerSearchComponent } from '../components/player-search/player-search.component';
import { PlayerLibraryComponent } from '../components/player-library/player-library.component';
import { PlayerDiscoverComponent } from '../components/player-discover/player-discover.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PlayerContentComponent, pathMatch: 'full', data: { animation: 'home' }} ,
  { path: 'search', component: PlayerSearchComponent, pathMatch: 'full', data: { animation: 'search'}},
  { path: 'library', component: PlayerLibraryComponent, pathMatch: 'full', data: { animation: 'library' }},
  { path: 'discover', component: PlayerDiscoverComponent, pathMatch: 'full', data: { animation: 'discover' }},
  { path: '**', redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
