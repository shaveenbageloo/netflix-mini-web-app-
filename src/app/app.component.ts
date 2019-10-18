import { Component } from '@angular/core';
import axios from 'axios';
import { Movies } from '../model/movies';
import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {

  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    this._cookieService.put("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

    // Set-Cookie: CookieName=CookieValue; SameSite=Lax;
    console.log("Set Test Cookie as Test");
  }


  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = [];

  title = 'netflix-mini-web-app';

  todoArray = [];

  searchMovies(searchBar) {

    this.todoArray = [];

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
        let posterPath = '';

        console.log('poster_path of the movies : ' + element.poster_path + ' - ' + element.release_date);
        if (element.poster_path) {
          posterPath = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        }
        else {
          posterPath = 'https://thumbs.dreamstime.com/z/no-user-profile-picture-24185395.jpg';
        }
        const movieObject = new Movies(element.title, element.release_date, element.vote_average, posterPath);
        this.todoArray.push(movieObject);

      });

    }).catch(e => {
      console.log('Error has occured ' + e);
    });

  }

  addTodo(value) { this.todoArray.push(value); console.log(this.todoArray); };

  deleteItem(todo) {
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
