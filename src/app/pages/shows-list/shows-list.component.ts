import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/movie';
import { PaginatorState } from 'primeng/paginator';
import { TvshowsService } from '../../services/tvshows.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { mapToMoviesDTO } from '../../types/tvshow';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent implements OnInit {
  constructor(
    private moviesService: MoviesService, 
    private tvShowsService: TvshowsService,
    private activatedRoute: ActivatedRoute
  ) {}

  showsList: Movie[] | null = null;
  searchValue = "";
  total = 0;
  showsType : 'movie' | 'tv' = 'movie';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.showsType = params['type'];
      this.getPagedShows(this.showsType, 1);
    });  
  }

  getPagedShows(showsType: 'movie' | 'tv', page: number, searchKeyword?: string) {
    if(showsType === 'movie') {
      this.moviesService.searchMovies(page, searchKeyword)
      .subscribe(data => {
        this.showsList = data.results;
        this.total = data.total_results;
      });
    } else if(showsType === 'tv') {
      this.tvShowsService
      .searchTvShows(page, searchKeyword)
      .pipe(map(mapToMoviesDTO))
      .subscribe(data => { 
        this.showsList = data.results;
        this.total = data.total_results;
      });
    }
  }

  searchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue);
  }
  
  onPageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(this.showsType, pageNumber, this.searchValue);
  }
}
