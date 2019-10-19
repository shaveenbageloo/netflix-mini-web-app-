import { Component } from '@angular/core';
import axios from 'axios';
import { Movies } from '../model/movies';
import { r3JitTypeSourceSpan } from '@angular/compiler';
// import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {

  title = 'netflix-mini-web-app';
  images = [];
  todoArray = [];
  favArray = [];
  essArray = [];


  getPostPath(inPath) {
    let posterPath = '';

    if (inPath) {
      if (inPath.indexOf('https://image.tmdb.org/t/p/w500') > 0) {
        posterPath = inPath;
      } else {
        posterPath = 'https://image.tmdb.org/t/p/w500' + inPath;
      }
    } else {
      posterPath = 'https://thumbs.dreamstime.com/z/no-user-profile-picture-24185395.jpg';
    }
    return posterPath;
  }



  // constructor(private _cookieService: CookieService) { }

  ngOnInit(): void {

    //this._cookieService.put("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");



    axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: '7d46a1e2eaad722e50de334a6895d840',
        language: 'en-US',
        sort_by: 'popularity.desc',
        page: '1',
        include_adult: 'false',
        include_video: 'false'
      }
    }).then(response => {

      const jsonObject = JSON.parse(JSON.stringify(response.data.results));

      jsonObject.forEach(e => {

        const movieObject = new Movies(e.id, e.title, e.release_date, e.vote_average, this.getPostPath(e.poster_path));
        this.todoArray.push(movieObject);

      });

    }).catch(err => {
      console.log('Error has occured ' + err);
    });
  }

  searchMovies(searchBar) {

    this.todoArray = [];

    if (searchBar === '#showFavs#') {
      console.log('Searching on your favs for now');

      const checkSessionStore = (sessionStorage.getItem('userFavourites'));
      const jsonSSObject = JSON.parse('[' + (checkSessionStore) + ']');

      jsonSSObject.forEach(e => {

        const movieObject = new Movies(e.id, e.title, e.releaseDate, e.voteAverage, e.posterPath);
        this.todoArray.push(movieObject);

      });

    } else {

      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '7d46a1e2eaad722e50de334a6895d840',
          language: 'en-US',
          query: searchBar,
          page: '1',
          include_adult: 'false'
        }
      }).then(response => {

        const jsonObject = JSON.parse(JSON.stringify(response.data.results));
        jsonObject.forEach(element => {
          const movieObject = new Movies(element.id.toString(), element.title, element.release_date, element.vote_average, this.getPostPath(element.poster_path));
          this.todoArray.push(movieObject);
        });

      }).catch(e => {
        console.log('Error has occured ' + e);
      });

    }

  }

  addTodo(value) {
    let duplicate = false;
    const valueToStore = (JSON.stringify(value));
    const valueToStoreJSONObject = JSON.parse(valueToStore);

    this.favArray.forEach(e => {

      const eObject = JSON.parse(e);
      if (eObject.id.toString() === valueToStoreJSONObject.id.toString()) {
        duplicate = true;
      }

    });

    if (!duplicate) {
      this.favArray.push(valueToStore);
      sessionStorage.setItem('userFavourites', this.favArray.toString());
    }
  }

  deleteToDo(todo) {
    for (let i = 0; i <= this.todoArray.length; i++) {
      if (todo === this.todoArray[i]) {
        this.todoArray.splice(i, 1);
      }
    }
  }

  todoSubmit(value: any) {
    if (value !== '') {
      this.todoArray.push(value.todo);
    }
  }
}
