import { Genre } from '../model/genre';
export class Movies {

    id: string;
    title: string;
    releaseDate: string;
    voteAverage: string;
    posterPath: string;
    showHide: boolean;
    overview: string;
    popularity: string;
    original_language: string;
    vote_count: string;
    genre_ids: string[];
    genreString: string;
    showingFavs: boolean;

    constructor(id: string, title: string, releaseDate: string,
        voteAverage: string, posterPath: string,
        showHide: boolean, original_language: string,
        vote_count: string, genre_ids: string[], genreArray, showingFavs: boolean) {

        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.voteAverage = voteAverage;
        this.posterPath = posterPath;
        this.showHide = showHide;
        this.original_language = original_language;
        this.vote_count = vote_count;
        this.genre_ids = genre_ids;
        this.genreString = '';
        this.getGenres(genreArray);
        this.showingFavs = showingFavs;



    }

    getGenres(genreArray) {
        this.genreString = "";

        genreArray.forEach(eFullListOfGenres => {

            this.genre_ids.forEach(eMovieGenres => {

                if (eMovieGenres === eFullListOfGenres.id) {
                    console.log('Matching ID');
                    this.genreString = this.genreString + eFullListOfGenres.name + ' | ';
                }
            });
        });

    }

}