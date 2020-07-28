import { Component, OnInit, Inject } from '@angular/core';
import { User, UserRole } from '../common.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

class EmptyUser implements User {
  firstName = '';
  lastName = '';
  email = '';
  role = 'Artist' as UserRole;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  public readonly roles:  UserRole[] = ['Art manager', 'Artist', 'Designer'];
  public user: User;
  public successCaption: string;
  public userForm = this.fb.group({
    firstName: ['', Validators.pattern('^[a-zA-Z]+$')],
    lastName: ['', Validators.pattern('^[a-zA-Z]+$')],
    email: ['', Validators.email],
    role: [this.roles[0], Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) userToEdit: User,
    private fb: FormBuilder,
  ) {
      this.user = (userToEdit ? userToEdit : new EmptyUser());
      this.successCaption = userToEdit ? 'Edit' : 'Create';
      this.userForm.patchValue(this.user);
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close()
  }
}
