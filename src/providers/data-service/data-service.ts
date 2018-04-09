import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  public mockupData: Array<any> =[
    [
      {name: 'Comp A', employees: 10},
      {name: 'Comp B', employees: 20},
      {name: 'Comp C', employees: 30},
      {name: 'Comp D', employees: 10},
      {name: 'Comp E', employees: 30}
    ],
    [
      {name: 'Comp A', employees: 30},
      {name: 'Comp B', employees: 30},
      {name: 'Comp C', employees: 10},
      {name: 'Comp D', employees: 10},
      {name: 'Comp E', employees: 20}
    ],
    [
      {name: 'Comp A', employees: 20},
      {name: 'Comp B', employees: 10},
      {name: 'Comp C', employees: 30},
      {name: 'Comp D', employees: 30},
      {name: 'Comp E', employees: 10}
    ],
    []
  ];

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  /**
   * observable that gets an array of data
   * @param {number} refreshTime
   * @returns {Observable<any>}
   */
  getData(refreshTime: number): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.mockupData[Math.floor(Math.random() * 4)]);
      setInterval(() => {
        let randIndex = Math.floor(Math.random() * 4);
        observer.next(this.mockupData[randIndex]);
      }, refreshTime * 1000);
    });
  }

}
