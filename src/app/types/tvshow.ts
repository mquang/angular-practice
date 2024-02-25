import { Movie, MoviesDTO } from "./movie"

export type TvShow = {
    id: number
    backdrop_path: string
    genre_ids: number[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    name: string
    vote_average: number
    vote_count: number
    first_air_date: string
}

export type TvShowsDTO = {
    page: number
    results: TvShow[]
    total_pages: number
    total_results: number
}

export function mapToMovies(tvshows: TvShow[]): Movie[] {
    return tvshows.map((tvshow : TvShow) => { //Array.map (not rxjs.map)
        return {
            ...tvshow, //copy old array using spread operator
            title: tvshow.name,
            original_title: tvshow.original_name
        } //return all old fields of tvshow plus 2 mapping fields (title, original_title)
    });
}

export function mapToMovie(tvshow: TvShow): Movie {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  }

export function mapToMoviesDTO(tvshowDto: TvShowsDTO): MoviesDTO {
    return {
      results: tvshowDto.results.map(mapToMovie),
      total_pages: tvshowDto.total_pages,
      total_results: tvshowDto.total_results,
      page: tvshowDto.page,
    };
  }