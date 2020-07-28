import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../common.interfaces';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Output() onEditClick = new EventEmitter<string>()
  @Output() onRemoveClick = new EventEmitter<string>()
  @Input() public dataSource: User[] = [];

  public displayedColumns: Array<keyof User | 'actions'> = ['firstName', 'lastName', 'email', 'role', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
