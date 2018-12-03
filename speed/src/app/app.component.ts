import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';
import {
  GlobalStore,
  GlobalSlideTypes
} from './core/store/global/global-store.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular speed';
  criteries;
  criteryList$;
  criterySelected;
  launchesList$: Observable<any>;
  constructor(
    private filterService: FilterService,
    private apiService: ApiService,
    private global: GlobalStore
  ) {}
  ngOnInit() {
    this.criteries = [
      { value: 'state', name: 'Estado' },
      { value: 'agencies', name: 'Agencia' },
      { value: 'type', name: 'Tipo' }
    ];

    this.loadData();
    this.criteryChanged();
    this.setLaunches();
  }
  loadData() {
    this.criterySelected = this.criteries[0];
    this.apiService.getAllLaunches();
    this.apiService.getStatues();
    this.apiService.getAgencies();
    this.apiService.getTypes();
  }
  setLaunches() {
    this.launchesList$ = this.global
      .select$(GlobalSlideTypes.launches)
      .pipe(map(launches => launches));
  }
  criteryChanged() {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.criteryList$ = this.global
          .select$(GlobalSlideTypes.agencies)
          .pipe(map(agencies => agencies));
        break;
      case 'state':
        this.criteryList$ = this.global
          .select$(GlobalSlideTypes.statuses)
          .pipe(map(statues => statues));
        break;
      case 'type':
        this.criteryList$ = this.global
          .select$(GlobalSlideTypes.types)
          .pipe(map(types => types));
        break;
    }
  }
  filterLaunches(filterSelected) {
    this.apiService.getAllLaunches();
    switch (this.criterySelected.value) {
      case 'agencies':
        this.filterService.getFilterAgencies(filterSelected.type);
        break;
      case 'state':
        this.filterService.getFilterMissions(filterSelected.id);
        break;
      case 'type':
        this.filterService.getFilterLaunchers(filterSelected.id);
        break;
    }
  }
}
