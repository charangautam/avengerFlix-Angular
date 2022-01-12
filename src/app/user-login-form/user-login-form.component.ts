import { Component, OnInit, Input } from '@angular/core';

// import to close dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// import API calls from backend 
import { FetchApiDataService } from '../fetch-api-data.service';
// import to display notification back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' }

  /**
  * * Called when creating an instance of the class
  * @param fetchApiData
  * @param dialogRef
  * @param snackBar
 */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  // This is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful login or an error
  */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // set user and token to local storage
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      // logic for successful user registration
      console.log(result)
      this.dialogRef.close() // close modal on success 
      this.snackBar.open('Logged in successfully', 'OK', {
        duration: 4000
      })
    }, (result) => {
      console.log(result);
      this.snackBar.open("Incorrect information, please try again", 'OK', {
        duration: 4000
      });
    })
  }

}
