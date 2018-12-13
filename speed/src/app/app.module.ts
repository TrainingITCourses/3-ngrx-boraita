import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { LaunchesListComponent } from './launches-list/launches-list.component';
import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';
import { reducers, metaReducers } from './reducers';
import { environment } from 'src/environments/environment.prod';
import { LauncherEffects } from './reducers/launcher.effects';

@NgModule({
  declarations: [AppComponent, FilterListComponent, LaunchesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([LauncherEffects]),
    environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ApiService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
