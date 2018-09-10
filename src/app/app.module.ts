import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './components/player/app.component';
import { PlayerBarComponent } from './components/player-bar/player-bar.component';
import { PlayerLeftSideMenuComponent } from './components/player-left-side-menu/player-left-side-menu.component';
import { PlayerSongComponent } from './components/player-song/player-song.component';
import { PlayerContentComponent } from './components/player-content/player-content.component';
import { PlayerLibraryComponent } from './components/player-library/player-library.component';
import { PlayerDiscoverComponent } from './components/player-discover/player-discover.component';
import { PlayerTopMenuComponent } from './components/player-top-menu/player-top-menu.component';
import { PlayerContentBoxComponent } from './components/player-content-box/player-content-box.component';
import { PlayerAlbumPreviewComponent } from './components/player-album-preview/player-album-preview.component';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { PlayerTracklistSongPreviewComponent } from './components/player-tracklist-song-preview/player-tracklist-song-preview.component';
import { PlayerVolumeBarComponent } from './components/player-bar/player-volume-bar/player-volume-bar.component';
import { PlayerBarSongInfoComponent } from './components/player-bar/player-bar-song-info/player-bar-song-info.component';
import { PlayerBarControlsComponent } from './components/player-bar/player-bar-controls/player-bar-controls.component';

import { ConvertSecondsPipe } from './pipes/convert-seconds.pipe';

import { RequestsHubService } from './services/requests-hub.service';
import { ShareService } from './services/share.service';
import { BgChangerDirective } from './directives/bg-changer.directive';

@NgModule({
  declarations: [
    AppComponent,
    PlayerBarComponent,
    PlayerLeftSideMenuComponent,
    PlayerSongComponent,
    PlayerContentComponent,
    PlayerLibraryComponent,
    PlayerDiscoverComponent,
    PlayerTopMenuComponent,
    PlayerContentBoxComponent,
    PlayerAlbumPreviewComponent,
    PlayerSearchComponent,
    PlayerTracklistSongPreviewComponent,
    ConvertSecondsPipe,
    PlayerVolumeBarComponent,
    BgChangerDirective,
    PlayerBarSongInfoComponent,
    PlayerBarControlsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    RequestsHubService,
    ShareService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
