import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService) {}

  showId = '';
  show$ : Observable<Movie> | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.showId = params['id'];
    });

    this.show$ = this.movieService.getMovieById(this.showId);
  }
}
