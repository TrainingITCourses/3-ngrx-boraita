import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';

import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';
import { Store } from '@ngrx/store';
import { State } from './core/store/reducers';
import { LauncherEffects } from './core/store/reducers/launchers/launcher.effects';
import { LoadLaunches } from './core/store/reducers/launchers/launches.actions';
import { LoadAgencies } from './core/store/reducers/Agencies/agencies.actions';
import { LoadStates } from './core/store/reducers/states/states.actions';
import { LoadTypes } from './core/store/reducers/types/types.actions';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';

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
  version = 2;
  constructor(
    private filterService: FilterService,
    private store: Store<State>,
    private swUpdate: SwUpdate
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
    this.observeVersions();
  }
  loadData() {
    this.criterySelected = this.criteries[0];
    this.store.dispatch(new LoadLaunches());
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadStates());
    this.store.dispatch(new LoadTypes());
  }
  criteryChanged() {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.criteryList$ = this.store.select('agencies').pipe(
          map(st => st.agencies),
          map(agencies => agencies)
        );
        break;
      case 'state':
        this.criteryList$ = this.store.select('states').pipe(
          map(st => st.states),
          map(states => states)
        );
        break;
      case 'type':
        this.criteryList$ = this.store.select('types').pipe(
          map(st => st.types),
          map(types => types)
        );
        break;
    }
  }
  filterLaunches(filterSelected) {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.launchesList$ = this.filterService.getFilterAgencies(
          filterSelected.type
        );
        break;
      case 'state':
        this.launchesList$ = this.filterService.getFilterMissions(
          filterSelected.id
        );
        break;
      case 'type':
        this.launchesList$ = this.filterService.getFilterLaunchers(
          filterSelected.id
        );
        break;
    }
  }
  observeLaunches() {
    this.launchesList$ = this.store
      .select('launches')
      .pipe(map(st => st.launches));
  }
  private observeVersions() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        debugger;
        window.location.reload();
      });
    }
  }
  // private observeLoading() {
  //   this.store.select('launch').subscribe(st => {
  //     if (st.loading) {
  //     } else {
  //       if (this.loadingDialog) {
  //         setTimeout(() => {
  //           this.dialogs.closeLoading(this.loadingDialog);
  //           this.loadingDialog = null;
  //         }, 100);
  //       }
  //     }
  //   });
  // }
}
