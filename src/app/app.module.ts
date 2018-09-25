import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from './../environments/environment';
import { COMPONENTS } from './components/index';
import { AppComponent } from './components/player/app.component';
import { ConvertSecondsPipe } from './pipes/convert-seconds.pipe';
import { ScrollableDirective } from './directives/scrollable.directive';

import { volumeReducer } from './store/volume/reducers/volume.reducer';
import { playingSongReduser } from './store/playing-song/reducers/playing-song.reducer';
import { VolumeEffects } from './store/volume/effects/volume.effect';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ConvertSecondsPipe,
    ScrollableDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({
      volume: volumeReducer,
      playingSong: playingSongReduser,
    }),
    EffectsModule.forRoot([VolumeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 10 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
