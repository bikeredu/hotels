import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private http: HttpClient
  ){}
  hotelName="";
  searchHotel(): Observable<any>{
    return this.http.get("http://localhost:3001/api/hotel/");
  }
}
