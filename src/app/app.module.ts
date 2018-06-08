import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './route/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { PlayerBarComponent } from './components/player-bar/player-bar.component';
import { PlayerLeftSideMenuComponent } from './components/player-left-side-menu/player-left-side-menu.component';
import { PlayerSongListComponent } from './components/player-song-list/player-song-list.component';
import { PlayerSongComponent } from './components/player-song/player-song.component';
import { PlayerContentComponent } from './components/player-content/player-content.component';
import { PlayerFeaturedComponent } from './components/player-featured/player-featured.component';
import { PlayerLibraryComponent } from './components/player-library/player-library.component';
import { PlayerDiscoverComponent } from './components/player-discover/player-discover.component';
import { PlayerTopMenuComponent } from './components/player-top-menu/player-top-menu.component';
import { PlayerContentBoxComponent } from './components/player-content-box/player-content-box.component';
import { PlayerAlbumPreviewComponent } from './components/player-album-preview/player-album-preview.component';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { PlayerTracklistSongPreviewComponent } from './components/player-tracklist-song-preview/player-tracklist-song-preview.component';
import { ConvertSecondsPipe } from './pipes/convert-seconds.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerBarComponent,
    PlayerLeftSideMenuComponent,
    PlayerSongListComponent,
    PlayerSongComponent,
    PlayerContentComponent,
    PlayerFeaturedComponent,
    PlayerLibraryComponent,
    PlayerDiscoverComponent,
    PlayerTopMenuComponent,
    PlayerContentBoxComponent,
    PlayerAlbumPreviewComponent,
    PlayerSearchComponent,
    PlayerTracklistSongPreviewComponent,
    ConvertSecondsPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
