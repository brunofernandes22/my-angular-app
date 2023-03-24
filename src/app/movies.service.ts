import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  private getMovies(params: {}, type: string) {
    return this.httpClient.get<any>(
      `https://movies-tv-shows-database.p.rapidapi.com/`, {
      headers: {
        'Type': type,
        'X-RapidAPI-Key': '5027542057msha38caf27b66abf7p1447fajsn6206a642a7a2',
        'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
      },
      params: params,
    }
    );
  }

  getTrendingMovies() {
    return this.getMovies(
      { page: '1' },
      'get-trending-movies'
    ).pipe(
      map(response =>
        response.movie_results.map((data: any) => {
          return {
            title: data.title,
            imdbId: data.imdb_id
          }
        })
      )

    )
  }

  getMoviesByTitle(title: string) {
    return this.getMovies(
      { title: title },
      'get-movies-by-title'
    ).pipe(
      map(response =>
        response.movie_results.flatMap((data: any) => {
          if(data && data.year !== 0)
          return  {
            title: data.title,
            imdbId: data.imdb_id,
            year: data.year
          }
          return []
        })
      )

    )
  }

  getMovieDetails(imdbId: string) {
    return this.getMovies(
      { movieid: imdbId },
      'get-movie-details'
    ).pipe(
      map((data: any) => {
        return data ? {
          title: data.title,
          description: data.description,
          year: data.year,
          releaseDate: data.release_date,
          imdbId: data.imdb_id,
          imdbRating: data.imdb_rating,
          voteCount: data.vote_count,
          popularity: data.popularity,
          youtubeKey: data.youtube_trailer_key,
          rated: data.rated,
          runtime: data.runtime
        } : undefined
      })
    )
  }

  getMovieCover(imdbId: string){
    return this.getMovies(
      { movieid: imdbId, salt: 's' },
      'get-movies-images-by-imdb'
    ).pipe(
      map((data: any) =>
        data.poster
      )
    ) 
  }
}

export interface Movie {
  title: string;
  imdbId: string;
  year: string;
}

export interface MovieDetails {
  title: string,
  imdbId: string,
  description: string,
  year: string,
  releaseDate: string,
  imdbRating: string,
  voteCount: string,
  popularity: string,
  youtubeKey: string,
  rated: string,
  runtime: number
}