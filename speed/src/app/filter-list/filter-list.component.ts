import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent {
  @Input() filterList;
  @Output() fieldSelected = new EventEmitter();

  onSelectedField(fieldSelected) {
    this.fieldSelected.next(fieldSelected);
  }
}
