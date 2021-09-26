import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from './../Movie';
import { MovieService } from './../services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie:Movie=new Movie(0,"hh","nnnlnllknln",'2019-06-29',0,null);
  imgSrc;
  constructor(private sanitizer: DomSanitizer,private movieService:MovieService,private router:Router) { }

  ngOnInit(): void {
    if(this.movie.image != null){
      let objectURL = 'data:image/*;base64,' + this.movie.image;
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

  }

  favMovie(e){

  }

  edit(){
    this.movieService.passMovieToEdit(this.movie);
    this.router.navigateByUrl('/editMovie');
  }

  delete(){
    this.movieService.deleteMovie(this.movie.id).subscribe((data)=>{
      console.log(data);
    },(err)=>{console.log(err);
    });
  }

}
