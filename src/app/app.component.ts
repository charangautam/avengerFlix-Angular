import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

// embedded components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'avengersFlix-Angular';

  constructor(public dialog: MatDialog) { }

  // function that will open the dialog when the register button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // assigning the dialog a width
      width: '300px'
    })
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // assigning the dialog a width
      width: '300px'
    })
  }
}
