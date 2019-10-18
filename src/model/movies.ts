export class Movies {

    title: string;
    releaseDate: string;
    voteAverage: string;
    posterPath: string;

    constructor(title: string, releaseDate: string, voteAverage: string, posterPath: string) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.voteAverage = voteAverage;
        this.posterPath = posterPath;
    }

}