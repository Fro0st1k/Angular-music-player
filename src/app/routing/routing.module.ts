import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerContentComponent } from '../components/player-content/player-content.component';
import { PlayerSearchComponent } from '../components/player-search/player-search.component';
import { PlayerLibraryComponent } from '../components/player-library/player-library.component';
import { PlayerDiscoverComponent } from '../components/player-discover/player-discover.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
<<<<<<< HEAD:src/app/route/routing.module.ts
  { path: 'home', component: PlayerContentComponent, pathMatch: 'full', data: { animation: 'home' }},
  { path: 'search', component: PlayerSearchComponent, pathMatch: 'full', data: { animation: 'search' }},
=======
  { path: 'home', component: PlayerContentComponent, pathMatch: 'full', data: { animation: 'home' }} ,
  { path: 'search', component: PlayerSearchComponent, pathMatch: 'full', data: { animation: 'search'}},
>>>>>>> 94db57e0ac0c3c2f71b004aa39f677aa97456a6f:src/app/routing/routing.module.ts
  { path: 'library', component: PlayerLibraryComponent, pathMatch: 'full', data: { animation: 'library' }},
  { path: 'discover', component: PlayerDiscoverComponent, pathMatch: 'full', data: { animation: 'discover' }},
  { path: '**', redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
