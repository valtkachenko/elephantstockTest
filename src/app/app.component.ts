import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserRole, TableFilter } from './common.interfaces';
import { UserService } from './services/user.service';
import { Subscription, interval, Subject } from 'rxjs';
import { debounce, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'elephantstockTest';
  public users: User[] = [];
  private subscription: Subscription[] = [];
  private subject$ = new Subject<TableFilter>();
  private users$ = this.subject$.pipe(
    debounce(() => interval(500)),
    switchMap(filter => this.userService.getAll(filter))
    );

  public filter: TableFilter = {
    searchString: '',
    role: 'All',
  };

  constructor(private readonly userService: UserService, private readonly userModal: MatDialog) {}

  ngOnInit() {
    this.subscription.push(
      this.users$.subscribe((users) => {
       this.users = users;
      })
    );

    this.load();
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

  load(){
    this.subject$.next(this.filter);
  }

  changeHandler(ev: {name: 'role', value: UserRole}): void;
  changeHandler(ev: {name: 'searchString', value: string}): void;
  changeHandler(ev: any) {
    this.filter[ev.name] = ev.value;
    this.load();
  }

  onEditClick(userId: string) {
    const user = this.users.find(u => u._id === userId);
    const modalRef = this.userModal.open<UserModalComponent, User,  User>(UserModalComponent, {data: user});
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.update({...result, _id: userId})
        .subscribe(newUser => {
          console.log('Edit - ', newUser);

          // const userIndex = this.users.findIndex(u => u._id === userId);
          // console.log(userIndex);

          this.users = this.users.map(user => {
            if (user._id === userId) {
              return newUser;
            }
            return user;
          })
        });
      }
    });
  }

  onRemoveClick(userId: string) {
    this.userService.delete(userId)
    .subscribe(() => {
      this.users = this.users.filter(user => user._id !== userId);
    })
  }

  onFabClick() {
    const modalRef = this.userModal.open<UserModalComponent, undefined, User>(UserModalComponent);
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.create(result)
        .subscribe(newUser => {
          this.users = this.users.concat(newUser);
        });
      }
    });
  }
}
