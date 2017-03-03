import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  private storage : SQLite;
  private isOpen: boolean;

  constructor(public http: Http, platform: Platform) {
    console.log('Hello Database Provider');

    if (!this.isOpen)
    {
      platform.ready()
      .then(() => {
        this.storage = new SQLite();
        console.log('Opening database.');
        this.storage.openDatabase({
          name: 'data.db',
          location: 'default' // the location field is required
        })
        .then(() => {
          console.log('Opened database.');
          this.storage.executeSql('create table IF NOT EXISTS People(name VARCHAR(32))', {})
          .then(()=>{
            console.log('Created table.');
            this.isOpen = true;
          });
        });
      });
    }
  }

  public createPerson(name: string){
    console.log('Creating person...');
    return new Promise( (resolve, reject) => {
        var querry = "INSERT INTO People (name) VALUES (\'" + name + "\')";
        console.log(querry);
        this.storage.executeSql(querry, {})
        .then( (data) => {
          console.log('Created person.');
          resolve(data);
        }, (error) => {
          console.log('Failed to create person.');
          reject(error);
        });
    });
  }

  public getPeople(){
    return new Promise ( (resolve, reject) => {
      let people = [];
      this.storage.executeSql("SELECT * FROM People",{})
      .then( (data) => {
        if (data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            people.push( {
              id: data.rows.item(i).id,
              name: data.rows.item(i).name
            });
          }
        }
        resolve(people);
      }, (error) =>{
        reject(error);
      });
    });
  }
}
