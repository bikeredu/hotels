import { Hotel } from './hotels.module';
//import {HotelsService} from "./hotels.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

/*filter demo*/

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
transform(items: any, filter: any, filterItems: Array<any>, isAnd: boolean): any {
  console.log('Filtering ..');
  if (filter && Array.isArray(items) && filterItems) {
    let filterKeys = Object.keys(filter);
    let checkedItems = filterItems.filter(item => { return item.checked; });
    if (!checkedItems || checkedItems.length === 0) { return items; }
    if (isAnd) {
      return items.filter(item =>
          filterKeys.reduce((acc1, keyName) =>
              (acc1 && checkedItems.reduce((acc2, checkedItem) => acc2 && new RegExp(item[keyName], 'gi').test(checkedItem.value) || checkedItem.value === "", true))
            , true)
            );
    } else {
      return items.filter(item => {
        return filterKeys.some((keyName) => {
          return checkedItems.some((checkedItem) => {
            return new RegExp(item[keyName], 'gi').test(checkedItem.value) || checkedItem.value === "";
          });
        });
      });
    }
  } else {
    return items;
  }
}
}


/*filters demo fin*/
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[];
  hotelName: string;
  public items: Array<any>;
  public filterItems: Array<any>;
  public numItems: number;
  public stars: string;
  constructor(private hotelsSrv: HttpClient) {
    this.items = [];
  }

  searchHotel(){
    let params = new HttpParams().set('name', this.hotelName);
    this.hotelsSrv.get('http://localhost:3001/api/hotel', { params }).subscribe((d: Hotel[]) =>{
      this.hotels =d;
      
    })
  }
  
  searchStars($item, $state){
    let url = "";
    if($item==0){
      url="http://localhost:3001/api/hotel";
    }else{
      url="http://localhost:3001/api/hotel/stars";
    }
    let params = new HttpParams().set('stars', $item);
    this.hotelsSrv.get(url, { params }).subscribe((d: Hotel[]) =>{
      this.hotels =d;
    })
  }
  checked() {
    let checkedItems2 = this.filterItems.filter(item => { return item.checked; });
  }
  createItems() {
    this.items.length = 0;
    this.filterItems = [
      {
        value: '0',
        checked: false
      },
      {
        value: '1',
        checked: false
      },
      {
        value: '2',
        checked: false
      },
      {
        value: '3',
        checked: false
      },
      {
        value: '4',
        checked: false
      },
      {
        value: '5',
        checked: false
      },
    ];
  }
  ngOnInit(): void{
    this.hotelsSrv.get('http://localhost:3001/api/hotel').subscribe((d: Hotel[]) =>{
      this.hotels =d;
      this.numItems = this.hotels.length;
    });
    this.createItems();
  }
}
