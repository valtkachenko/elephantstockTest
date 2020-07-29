import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserRole, TableFilter } from './common.interfaces';
import { UserService } from './services/user.service';
import { Subscription, interval, Subject, throwError } from 'rxjs';
import { debounce, switchMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModalComponent } from './user-modal/user-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private readonly userService: UserService,
    private readonly userModal: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

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

  showError(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 4000,
      panelClass: 'background-red',
    })
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      this.showError(error.error.message);
      return throwError(error.error.message);
    }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      this.showError(error.error)

    // Return an observable with a user-facing error message.
    return throwError(error.error);
  }

  onEditClick(userId: string) {
    const user = this.users.find(u => u._id === userId);
    const modalRef = this.userModal.open<UserModalComponent, User,  User>(UserModalComponent, {data: user});
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.update({...result, _id: userId})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe(newUser => {
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
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(() => {
      this.users = this.users.filter(user => user._id !== userId);
    })
  }

  onFabClick() {
    const modalRef = this.userModal.open<UserModalComponent, undefined, User>(UserModalComponent);
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.create(result)
        .pipe(
          catchError(this.handleError)
        )
        .subscribe(newUser => {
          this.users = this.users.concat(newUser);
        });
      }
    });
  }
}
