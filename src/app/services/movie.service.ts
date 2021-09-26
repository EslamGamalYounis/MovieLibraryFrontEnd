import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Movie} from 'src/app/Movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  myObservable:Observable<Array<Movie>> ;

  private baseUrl:string= "http://localhost:31764/api/Movie/";
  passedMovie:Movie;
  constructor(private httpClient:HttpClient) { }


  getAllMovies(){
    return this.httpClient.get<Movie[]>(this.baseUrl);
  }

  addMovie(movie){
    return this.httpClient.post(this.baseUrl+"movie",movie, {responseType: 'text'});
  }

  editMovie(id,movie){
    return this.httpClient.put(this.baseUrl+"movie/"+id,movie);
  }

  deleteMovie(id){
    return this.httpClient.delete(this.baseUrl+id,{responseType: 'text'});
  }

  passMovieToEdit(movie){
    this.passedMovie = movie;
  }
}
