import { Component, OnInit, Input } from '@angular/core';

// import to close dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// import API calls from backend 
import { FetchApiDataService } from '../fetch-api-data.service';
// import to display notification back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  /**
   * Binds input values to userData object
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for successful user registration
      console.log(result)
      this.dialogRef.close() // close modal on success 
      this.snackBar.open('User registration successful', 'OK', {
        duration: 4000
      })
    }, (result) => {
      console.log(result);
      this.snackBar.open("Username already exists. Please try a different username", 'OK', {
        duration: 4000
      });
    })
  }

}
