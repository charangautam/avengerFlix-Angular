import { Component, OnInit } from '@angular/core';
// import API calls from backend 
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// embedded components
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  // empty states that gets populated in functions
  movies: any[] = [];
  favorited: any[] = []

  /**
   * Called when creating an instance of the class
   * @param fetchApiData 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.getMovies()
    this.getFavorites()
  }

  /**
   * Retrieves all movies from database
   * @returns the movies state which is an array including all the movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Retrieves the movie's and description from database
   * @param Title {string}
   * @param Description {string}
   * @returns opening of DetailsDialogComponent upon click
   */
  openDetailsDialog(Title: string, Description: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { Title, Description }
    })
  }

  /**
   * Retrieves the genre's name and description from database
   * @param Name {string}
   * @param Description {string}
   * @returns opening of GenreDialogComponent upon click
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { Name, Description }
    })
  }

  /**
  * Retrieves the directors's name, bio and age from database
  * @param Name {string}
  * @param Bio {string}
  * @param Age {string}
  * @returns opening of DirectorDialogComponent upon click
  */
  openDirectorDialog(Name: string, Bio: string, Age: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { Name, Bio, Age }
    })
  }

  /**
   * Retrieves the logged in user's favorited movies
   * @returns filterFavorites() function which filters the favorited movies
   */
  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorited = resp.FavoriteMovies;
      console.log(this.favorited);
      return this.favorited;
    });
  }

  /**
   * Adds a movie to logged in user's favorited movies
   * @param movieId {string}
   */
  addFavMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`Successfully added to your favorites list`, 'OK', {
        duration: 4000,
      });
      this.getFavorites()
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from logged in user's favorited movies
   * @param movieId {string}
   */
  removeFavMovie(movieId: string): void {
    this.fetchApiData.deleteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`Successfully removed from your favorites list`, 'OK', {
        duration: 4000,
      });
      this.getFavorites()
      this.ngOnInit();
    });
  }

  /**
   * Checks whether or not a movies is in the logged in user's favorited movies 
   * @param movieId {string}
   * @returns true or false
   */
  inFavorited(movieId: string): boolean {
    if (this.favorited.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }
}
