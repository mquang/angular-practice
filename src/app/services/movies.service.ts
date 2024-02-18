import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesDTO } from '../types/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    return this.http.get<MoviesDTO>('https://api.themoviedb.org/3/movie/popular?api_key=56d2c2130b510b88ef1590fbdf03188f');
  }
}
