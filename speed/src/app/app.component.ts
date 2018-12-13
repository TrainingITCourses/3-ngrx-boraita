import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';
import {
  GlobalStore,
  GlobalSlideTypes
} from './core/store/global/global-store.state';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { LauncherEffects } from './reducers/launcher.effects';
import { LaunchesActionTypes, LoadLaunches } from './reducers/launches.actions';

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
  launchesList$;
  constructor(
    private filterService: FilterService,
    private apiService: ApiService,
    private global: GlobalStore,
    private store: Store<State>,
    private launcherEffect: LauncherEffects
  ) {}
  ngOnInit() {
    this.criteries = [
      { value: 'state', name: 'Estado' },
      { value: 'agencies', name: 'Agencia' },
      { value: 'type', name: 'Tipo' }
    ];

    this.loadData();
    this.observeLaunches();
    this.criteryChanged();
  }
  loadData() {
    this.criterySelected = this.criteries[0];
    this.store.dispatch(new LoadLaunches());
    this.apiService.getStatues();
    this.apiService.getAgencies();
    this.apiService.getTypes();
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
    debugger;

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
  observeLaunches() {
    this.launchesList$ = this.store
      .select('launch')
      .pipe(
        // tap(() => (this.loaded = true)),
        // map(st => {
        //   debugger;
        //   return st.launches;
        // }),
        map(launches => {
          debugger;
          if (!launches) {
            return [];
          }
          return launches
            .filter(l => new Date(l.windowstart) > new Date())
            .sort((a, b) => (a.isostart > b.isostart ? 1 : -1))
            .slice(0, 1)[0];
        })
      );
  }
}
