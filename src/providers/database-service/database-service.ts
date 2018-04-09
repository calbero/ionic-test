import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Platform} from "ionic-angular";
import {Mockup} from "../../models/mockup";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  private db: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'techTest.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        console.log('db opened');
        this.db = db;
        this.createTable().then(() => {
          console.log('table created');
          this.dbReady.next(true);
        }, (error) => console.error(error.message));
      }, (error) => console.error(error.message));
    })
  }

  /**
   * Checks if db is ready
   * @returns {Promise<any>}
   */
  private isReady() {
    return new Promise((resolve, reject) => {
      if (this.dbReady.getValue()) {
        resolve();
      } else  {
        this.dbReady.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        }, (error) => {
          console.error(error.message);
          reject();
        });
      }
    });
  }

  /**
   * Create table if not exists
   * @returns {Promise<any>}
   */
  createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS company_employees(id INTEGER PRIMARY KEY, array BLOB);';
    return this.db.executeSql(sql, []);
  }

  /**
   * Inserts a mockup object on table
   * @param {Mockup} bean
   * @returns {Promise<void | any>}
   */
  insertValue(bean: Mockup) {
    let sql = 'INSERT INTO company_employees(id, array) VALUES (?, ?);';
    return this.isReady().then(() => {
      return this.db.executeSql(sql, [bean.id, bean.array]);
    }, (error) => console.error(error.message));
  }

  /**
   * gets a mockup object by id
   * @param {number} id
   * @returns {Promise<void | any>}
   */
  getArrayById(id: number) {
    let sql = 'SELECT * FROM company_employees WHERE id=?';
    return this.isReady().then( () => {
      return this.db.executeSql(sql, [id]).then( response => {
        return response.rows.item(0);
      }, (error) => {
        console.error(error.message);
      });
    }, (error) => console.error(error.message));
  }

  /**
   * Observable that gets an array of data
   * @param {number} refreshTime
   * @returns {Observable<any>}
   */
  getData(refreshTime: number): Observable<any> {
    return new Observable((observer) => {
      this.getArrayById(Math.floor(Math.random() * 4) + 1).then((value) => {
        observer.next(value);
      }, (error) => console.error(error));
      setInterval(() => {
        let randIndex = Math.floor(Math.random() * 4) + 1;
        this.getArrayById(randIndex).then((value) => {
          observer.next(value);
        }, (error) => console.error(error));
      }, refreshTime * 1000);
    });
  }
}
