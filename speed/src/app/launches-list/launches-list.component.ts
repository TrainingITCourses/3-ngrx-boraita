import { Component, Input } from '@angular/core';

import { LaunchLight } from '../store/models/launch-light';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.css']
})
export class LaunchesListComponent {
  @Input() launchesList: Array<LaunchLight> = [];

}
