import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvShowsDTO } from '../types/tvshow';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  private apiBaseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '56d2c2130b510b88ef1590fbdf03188f';

  constructor(private http: HttpClient) { }

  getTvShowsByType(type: string, nbrDispl = 20) {
    return this.http.get<TvShowsDTO>(
      `${this.apiBaseUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map(data => data.results.slice(0, nbrDispl)));
      ;
  }
}
