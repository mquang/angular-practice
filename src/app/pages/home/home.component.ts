import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovies } from '../../types/tvshow';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private moviesService: MoviesService, private tvShowsService: TvshowsService) {}

  // upcomingMovies$ = this.moviesService.getUpcomingMovies();
  // topRatedMovies$ = this.moviesService.getTopRatedMovies();

  upcomingMovies$ = this.moviesService.getMoviesByType('upcoming', 12);
  topRatedMovies$ = this.moviesService.getMoviesByType('top_rated', 12);
  popularTvShows$ = this.tvShowsService.getTvShowsByType('popular', 12).pipe(map(mapToMovies));
}
