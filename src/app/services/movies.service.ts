import { HttpClient } from '@angular/common/http'; //HttpClientModule is required
import { Injectable } from '@angular/core';
import { GenresDTO, Movie, MoviesDTO } from '../types/movie';
import { map } from 'rxjs';
import { ImagesDTO } from '../types/image';
import { CreditsDTO } from '../types/credits';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiBaseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '56d2c2130b510b88ef1590fbdf03188f';

  constructor(private http: HttpClient) { }

  /*
  getPopularMovies() {
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getUpcomingMovies() {
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/movie/upcoming?api_key=${this.apiKey}`);
  }

  getTopRatedMovies() {
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }
  */

  getMoviesByType(type: string, nbrDispl = 20) {
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/movie/${type}?api_key=${this.apiKey}`) //return Observable<MoviesDTO> => use data.results in the template 
      .pipe(map(data => data.results.slice(0, nbrDispl))); //return Observable<Movie[]> => use data in the template 
      ;
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiBaseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieImages(id: string) {
    return this.http.get<ImagesDTO>(
      `${this.apiBaseUrl}/movie/${id}/images?api_key=${this.apiKey}`)
      .pipe(map(data => data.backdrops));
      ;
  }

  getMovieCast(id: string) {
    return this.http.get<CreditsDTO>(
      `${this.apiBaseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map(data => data.cast));
      ;
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? "search/movie" : "movie/popular"
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`)
      ;
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDTO>(`${this.apiBaseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((data) => data.genres));
  }

  getMoviesByGenre(genreId: string, pageNumber = 1) {
    return this.http
      .get<MoviesDTO>(
        `${this.apiBaseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        map((data) => {
          return data.results;
        })
      );
  }
}
