import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { Movie } from '../../types/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Image } from '../../types/image';
import { Actor } from '../../types/credits';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie } from '../../types/tvshow';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private movieService: MoviesService,
    private tvService: TvshowsService
  ) {}

  showId = '';
  show$ : Observable<Movie> | null = null;
  showImages$: Observable<Image[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;
  showType: 'tv' | 'movie' = 'movie';

  imageSizes = IMAGES_SIZES;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.showId = params['id'];
      this.showType = params['type'];
    });

    if (this.showType === 'movie') {
      this.show$ = this.movieService.getMovieById(this.showId);
      this.showImages$ = this.movieService.getMovieImages(this.showId);
      this.showCast$ = this.movieService.getMovieCast(this.showId);
    } else if(this.showType === 'tv') {
      this.show$ = this.tvService
        .getTvShowById(this.showId)
        .pipe(map(mapToMovie));
      this.showImages$ = this.tvService.getTvShowImages(this.showId);
      this.showCast$ = this.tvService.getTvShowCast(this.showId);
    }
  }
}
