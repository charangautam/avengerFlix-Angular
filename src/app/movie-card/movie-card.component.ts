import { Component, OnInit } from '@angular/core';
// import API calls from backend 
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// embedded components
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { Name, Description }
    })
  }

  openDirectorDialog(Name: string, Bio: string, Age: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { Name, Bio, Age },
    })
  }

  openMovieDetailsDialog(): void {
    this.dialog.open(MovieDetailsDialogComponent)
  }

}