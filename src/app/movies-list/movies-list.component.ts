import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './../Movie';
import { MovieService } from './../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  MovieList:Movie[];
  subscriber;
  constructor(private _router:Router,private movieService:MovieService) { }

  ngOnInit(): void {
    this.subscriber = this.movieService.getAllMovies().subscribe(data=>{
      this.MovieList = data;
    },(err)=>{
      console.log(err);
    })
  }

  goAddMovie(){
    this._router.navigateByUrl("/addMovie");
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
