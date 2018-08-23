import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
let params = new HttpParams().set('name', 'quo vero reiciendis velit similique earum');
@Injectable()
export class HotelsService {
  constructor(private http: HttpClient) { }
  getHotels(){
    return this.http.get('https://jsonplaceholder.typicode.com/comments', { params }).toPromise();
  }

}
