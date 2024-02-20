import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagesBaseUrl } from '../../constants/images-sizes';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  animations: [ //BrowserAnimationsModule is required
    trigger('slideFade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [animate('1s')]),
    ]),
  ]
})
export class SliderComponent implements OnInit {

  constructor(private moviesService: MoviesService) {}

  movies: any;

  slideIndex = 0;
  totalCount = 0;

  imageBaseUrl = imagesBaseUrl;

  ngOnInit(): void {
    this.getPopularMovies();
    this.changeSlide();
  }

  getPopularMovies() {
    // this.moviesService.getPopularMovies()
    this.moviesService.getMoviesByType('popular')
    .subscribe(data => {
      this.movies = data;
      this.totalCount = data.results.length;
    })
  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if(this.slideIndex >= this.totalCount) {
        this.slideIndex = 0;
      }
    }, 5000)
  }
  
}
