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

  movies: any[] = [];
  favorited: any[] = []

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
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

  openDetailsDialog(Title: string, Description: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { Title, Description }
    })
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { Name, Description }
    })
  }

  openDirectorDialog(Name: string, Bio: string, Age: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { Name, Bio, Age }
    })
  }

  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorited = resp.FavoriteMovies;
      console.log(this.favorited);
      return this.favorited;
    });
  }

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

  inFavorited(movieId: string): boolean {
    if (this.favorited.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }
}
