import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from '../Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  imageSrc;
  imagePreview;
  @Input() movie:Movie=new Movie(0,"","",'',0,null);
  @ViewChild('warningDiv', {static: true}) warningDiv :ElementRef;

  useMyPipeToFormatThatValue ="date:'MM/dd/yy'"
  constructor(private sanitizer: DomSanitizer,private movieService:MovieService,private router:Router) { }

  ngOnInit(): void {
    this.movie =this.movieService.passedMovie;
    if(this.movie!=undefined && this.movie.image!= null)
    {
        let objectURL = 'data:image/*;base64,' + this.movie.image;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.imagePreview = this.imageSrc;
    }
    if(!this.movie){
      this.movie= new Movie(null,"",null,0,"","");
    }
  }

  OnDestroy(){
    this.OnDiscard();
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

  onUpdateMovie(name,desc,date){
    if(name != ""&&desc != ""&& date != null){
      const formData = new FormData();
      const id = this.movie.id;
      formData.append("name",name);
      formData.append("description",desc);
      formData.append("releaseDate",date);
      formData.append("Image",this.imageSrc);

      this.movieService.editMovie(id,formData).subscribe((response)=>{
        if(response){
          console.log(response);
          this.OnDiscard();
          this.router.navigateByUrl('/movieListItem')
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
