import { HttpClient } from '@angular/common/http'; //HttpClientModule is required
import { Injectable } from '@angular/core';
import { MoviesDTO } from '../types/movie';

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

  getMoviesByType(type: string) {
    return this.http.get<MoviesDTO>(
      `${this.apiBaseUrl}/movie/${type}?api_key=${this.apiKey}`);
  }
}
