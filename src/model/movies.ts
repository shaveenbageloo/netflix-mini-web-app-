export class Movies {

    id: string;
    title: string;
    releaseDate: string;
    voteAverage: string;
    posterPath: string;

    constructor(id: string, title: string, releaseDate: string, voteAverage: string, posterPath: string) {

        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.voteAverage = voteAverage;
        this.posterPath = posterPath;

    }

}