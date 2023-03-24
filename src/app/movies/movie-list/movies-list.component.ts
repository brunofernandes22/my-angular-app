import { Component, OnInit } from '@angular/core';
import { Movie, MoviesService } from '../../movies.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MovieListComponent implements OnInit {

  constructor(private service: MoviesService) { }

  id: number | undefined;
  movies: Movie[] = [];
  loadCompleted: boolean = false;
  searchString: string = "";
  searchIcon = faMagnifyingGlass;

  ngOnInit(): void {
    this.service.getTrendingMovies().subscribe({
      next: (data) => this.movies = data,
      complete: () => this.loadCompleted = true
  });
  }

  onKey(event: any) {
    this.searchString = event.target.value;
  }

  getMovies(){
   return this.service.getMoviesByTitle(this.searchString).subscribe({
    next: (data) => this.movies = data,
    complete: () => this.loadCompleted = true
});
  }
}
