import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Design} from './design'
import {of} from 'rxjs/observable/of';
import {Http, Response} from '@angular/http';

@Injectable()
export class DesignService {

  constructor(private http:HttpClient) { }

  getDesign():Observable<Design>{
     return this.http.get<Design>('http://localhost:3000/api/getDesign');
  };

  addDesign(img:String):Observable<Design>{
     return this.http.post<Design>('http://localhost:3000/api/addDesign',{'image':img});
  };

}

 
 