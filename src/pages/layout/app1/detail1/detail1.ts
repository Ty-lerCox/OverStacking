import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { IStack } from '../../../../app/app.interfaces'


@IonicPage()
@Component({
  selector: 'page-detail1',
  templateUrl: 'detail1.html'
})
export class Detail1Page {
  @ViewChild(Navbar) navBar: Navbar;
  ID:any;
  stackID;
  stack: IStack;
  stacksCol: AngularFirestoreCollection<IStack>;
  heroes: string[] = [];
  tankCount: number;
  dpsCount: number;
  supportCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.ID = this.navParams.get('Id');
    this.stackID = this.navParams.get('stackId');
    this.stacksCol = this.navParams.get('stacksCol');

    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
      return;
    } else {
      this.stacksCol.doc<IStack>(String(this.stackID)).valueChanges().subscribe(data => {
        this.stack = data;
        this.mapRequiredHeroes();
        console.log(data);
      });
    }

  }

  ionViewDidLoad() {
  }

  mapRequiredHeroes() {
    switch (this.stack.comp) {
      case "2-2-2 (2 tanks, 2 dps, 2 support)":
        this.tankCount = 2;
        this.dpsCount = 2;
        this.supportCount = 2;
        break;
      case "1-4-2 (1 tank, 4 dps, 2 support)":
        this.tankCount = 1;
        this.dpsCount = 4;
        this.supportCount = 2;
        break;
      case "4-0-2 (4 tanks, 2 support)":
        this.tankCount = 4;
        this.dpsCount = 0;
        this.supportCount = 2;
        break;
    }

    for (let index = 0; index < this.tankCount; index++) {
      this.heroes.push("Any Tank");
    }
    for (let index = 0; index < this.dpsCount; index++) {
      this.heroes.push("Any DPS");
    }
    for (let index = 0; index < this.supportCount; index++) {
      this.heroes.push("Any Support");
    }

    var BreakException = {};
    if (this.stack.tank_heroes != "") {
      var heroes = this.stack.tank_heroes;
      for (let tank of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (item == "Any Tank") {
              this.heroes[index] = tank;
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      }
    }

    if (this.stack.dps_heroes != "") {
      heroes = this.stack.dps_heroes;
      for (let tank of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (item == "Any DPS") {
              this.heroes[index] = tank;
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      }
    }
    
    if (this.stack.support_heroes != "") {
      heroes = this.stack.support_heroes;
      for (let tank of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (item == "Any Support") {
              this.heroes[index] = tank;
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      }
    }
  }

  roleSelected(hero: string) {
    this.stacksCol.doc<IStack>(String(this.stackID)).valueChanges().subscribe(data => {
      this.stack = data;
      this.mapRequiredHeroes();
      console.log(data);
    });
  }
}
