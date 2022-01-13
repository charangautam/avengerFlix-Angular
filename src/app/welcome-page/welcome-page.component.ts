import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

// embedded components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

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
