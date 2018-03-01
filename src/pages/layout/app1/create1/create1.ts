import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { IStack } from '../../../../app/app.interfaces';

/**
 * Generated class for the Create1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create1',
  templateUrl: 'create1.html',
})
export class Create1Page {
  ID;
  stack
  tankCount: number;
  dpsCount: number;
  supportCount: number;
  error = "No error yet";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
    this.ID = this.navParams.get('Id');
    if (!this.ID) {
      this.ID = 0;
    }
  }

  ionViewDidLoad() {
    this.stack = {
      description: "",
      type: "",
      comp: "",
      tank_heroes: "",
      dps_heroes: "",
      support_heroes: "",
      skill_range: { lower: 2000, upper: 3000 }
    } as IStack;
  }

  createStack() {
    if (!this.validateComp()) {
      return console.log("invalid comp");
    }
    this.stack.category = this.ID;
    console.log(this.stack.category);


    try {
      this.afDB.list("stacks").push(this.stack).then(() => {
        this.navCtrl.push('List1Page', {Id: this.ID });
      });
    }
    catch (error) {
      this.error = error;
    }


  }

  compSelected() {
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
    this.stack.tank_heroes = "";
    this.stack.dps_heroes = "";
    this.stack.support_heroes = "";
  }

  validateComp(): boolean {    
    var valid = true;
    if (this.stack.tank_heroes.length > this.tankCount) {
      valid = false;
    }
    if (this.stack.dps_heroes.length > this.dpsCount) {
      valid = false;
    }
    if (this.stack.support_heroes.length > this.supportCount) {
      valid = false;
    }
    return valid;
  }

}
