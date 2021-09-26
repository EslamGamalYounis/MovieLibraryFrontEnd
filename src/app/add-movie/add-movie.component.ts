import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './../Movie';
import { MovieService } from './../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  imageSrc;
  imagePreview;
  movie:Movie=new Movie(0,"","",'',0,null);
  @ViewChild('warningDiv', {static: true}) warningDiv :ElementRef;

  constructor(private movieService:MovieService,private _router:Router) { }

  ngOnInit(): void {
  }

  OnUpload(event){
    if (event.target.files && event.target.files[0]) {
      this.imageSrc = event.target.files[0];
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ()=> {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCreateMovie(name,desc,date){
    if(name != ""&&desc != ""&& this.imageSrc !=null && date != null){
      const formData =new FormData();
      formData.append("name",name);
      formData.append("description",desc);
      formData.append("releaseDate",date);
      formData.append("Image",this.imageSrc);;
      let subscriber =this.movieService.addMovie(formData)
      .subscribe((data)=>{
        if(data){
          console.log(data)
          this.OnDiscard();
          this._router.navigateByUrl("/movieListItem");
        }
      },
      (err)=>{
        console.log(err);
      });
    }
    else{
      this.warningDiv.nativeElement.style.display='block';
    }

  }

  OnDiscard(){
    this.movie = new Movie(0,"","",'',0,null);
    this.imageSrc =null;
    this.imagePreview =null;
}

}
