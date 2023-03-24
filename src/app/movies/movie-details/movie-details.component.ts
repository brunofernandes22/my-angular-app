import { Component, Input } from '@angular/core';
import { Movie, MovieDetails, MoviesService } from 'src/app/movies.service';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  @Input() movie?: Movie;
  @Input() coverImgUrl?: string;
  movieDetails?: MovieDetails;
  faYoutube = faYoutube;
  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.service.getMovieDetails(this.movie!.imdbId).subscribe((data => { 
      this.movieDetails = data;
    }));
  }
}
