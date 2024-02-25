import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvShow, TvShowsDTO } from '../types/tvshow';
import { ImagesDTO } from '../types/image';
import { CreditsDTO } from '../types/credits';

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

  getTvShowById(id: string) {
    return this.http.get<TvShow>(
      `${this.apiBaseUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  getTvShowImages(id: string) {
    return this.http
      .get<ImagesDTO>(`${this.apiBaseUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops));
  }

  getTvShowCast(id: string) {
    return this.http
      .get<CreditsDTO>(`${this.apiBaseUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast));
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http.get<TvShowsDTO>(
      `${this.apiBaseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
    );
  }
}
