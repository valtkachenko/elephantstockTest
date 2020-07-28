import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserRole } from '../common.interfaces';
import { MatSelectChange } from '@angular/material/select';

const roles: UserRole[] = ['Art manager', 'Designer', 'Artist'];

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent implements OnInit {
  public readonly roles = ['All'].concat(roles);

  @Input()
  public role: (UserRole | 'All');

  @Input()
  public searchString: string;

  @Output()
  onFilterChange: EventEmitter<{name: 'role' | 'searchString', value: string}> = new EventEmitter();

  ngOnInit(): void {
  }

  handleChange(event: DomEvent<HTMLInputElement> | MatSelectChange, name: 'role' | 'searchString') {
    this.onFilterChange.emit({name, value: (event instanceof MatSelectChange ? event.value : event.target.value)});
  }

}
