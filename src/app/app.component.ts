import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'netflix-mini-web-app';

  todoArray = [];

  searchMovies(searchBar: string) {
    axios.get('https://api.themoviedb.org/3/search/movie',
      {
        api_key: '7d46a1e2eaad722e50de334a6895d840',
        language: 'en-US',
        query: searchBar,
        page: '1',
        include_adult: 'false'
      }
    ).then(response => {
      let jsonObject = JSON.parse(JSON.stringify(response.data.results));
      jsonObject.forEach(element => {
        // console.log('Name of the movies : ' + element.title);
        this.todoArray.push(element.title);
      });
    })
      .catch(e => {
        console.log('Error has occured ' + e);
      })
  }

  addTodo(value) { this.todoArray.push(value); console.log(this.todoArray); };

  deleteItem(todo) {
    for (let i = 0; i <= this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
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
