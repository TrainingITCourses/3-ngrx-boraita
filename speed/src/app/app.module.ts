import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { LaunchesListComponent } from './launches-list/launches-list.component';
import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';

@NgModule({
  declarations: [AppComponent, FilterListComponent, LaunchesListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ApiService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
