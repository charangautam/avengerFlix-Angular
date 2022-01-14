import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  movies: any[] = []
  favorited: any[] = []
  favoritedTitle: any = []
  user: any = {}

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.getMovies()
    this.getFavorites()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorited = resp.FavoriteMovies;
      console.log(this.favorited);
      return this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorited.includes(movie._id)) {
        this.favoritedTitle.push(movie.Title);
      }
    });
    console.log(this.favoritedTitle);
    return this.favoritedTitle;
  }

  getUser(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp
      return this.user
    })
  }

  editUserInfo(): void {
    const updatedData = {
      Username: this.userData.Username ? this.userData.Username : this.user.Username,
      Password: this.userData.Password ? this.userData.Password : this.user.Password,
      Email: this.userData.Email ? this.userData.Email : this.user.Email,
      Birthday: this.userData.Birthday ? this.userData.Birthday : this.user.Birthday,
    }

    this.fetchApiData.editUser(updatedData).subscribe((resp: any) => {
      console.log(resp)
      this.snackBar.open("You have updated your profile", "OK", {
        duration: 4000
      });
      localStorage.setItem('user', resp.Username)
      this.getUser()
    }, (resp: any) => {
      console.log(resp)
      this.snackBar.open("Something went wrong, please try again", "OK", {
        duration: 4000
      });
    })
  }
}
