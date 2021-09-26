import { Byte } from "@angular/compiler/src/util";

export class Movie{
  public id:number;
  public name:string;
  public description:string;
  public releaseDate:Date;
  public rating:number;
  public image:Byte[];

  constructor(id,name,description,releaseDate,rating,image) {
    this.id= id;
    this.name =name;
    this.description =description;
    this.releaseDate =releaseDate;
    this.rating =rating;
    this.image=image;
  }
}
