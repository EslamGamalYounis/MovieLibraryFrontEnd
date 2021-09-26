import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes:Routes = [
  {
    path:'', redirectTo: '/movieListItem', pathMatch: 'full'
  },
  {path:'movieListItem',component:MoviesListComponent},
  {path:'addMovie',component:AddMovieComponent},
  {path:'editMovie',component:EditMovieComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    MoviesListComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
