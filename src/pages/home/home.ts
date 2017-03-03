import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Database} from "../../providers/database";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public itemList: Array<Object>;

  constructor(public navCtrl: NavController, private database: Database) {
    console.log('HomePage constructor');
  }

  public addPerson(name: string){
    let logText = 'Adding person: ' + name;
    console.log(logText);
    this.database.createPerson(name);
  }

  public refreshView(){
    this.database.getPeople()
    .then( (result) => {
      this.itemList = <Array<Object>> result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }
}
