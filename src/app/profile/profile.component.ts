import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  movies: any[] = []
  favorited: any[] = []
  favoritedTitle: any = []

  constructor(public fetchApiData: FetchApiDataService) { }

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
}
