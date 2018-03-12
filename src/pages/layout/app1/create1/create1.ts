import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase/app';
import { Keyboard } from '@ionic-native/keyboard';


import { IStack, IProfile } from '../../../../app/app.interfaces';

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
  stacksCol: AngularFirestoreCollection<IStack>;
  error = "";
  isEdit: boolean;
  stackID;
  user;
  disabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, public afAuth: AngularFireAuth, private keyboard: Keyboard) {
    this.ID = this.navParams.get('Id');
    this.stacksCol = this.navParams.get('stacksCol');
    this.stack = this.navParams.get('stackObj');
    this.stackID = this.navParams.get('stackID');
    this.user = this.navParams.get('user');

    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
      return;
    } else {
      var uID = this.afAuth.auth.currentUser.uid;
      var username;

      this.afs.collection("profiles").doc<IProfile>(uID).valueChanges().subscribe(profileData => {
        username = profileData.Username;
        if ((username == "") || (username == null)) {
          let options = {
            action: "updateProfile"
          } as NavOptions;
          this.navCtrl.setRoot("Category1Page", options);
        }

        if (!this.stack) {
          this.stack = {
            description: "",
            type: "",
            comp: "",
            tank_heroes: "",
            dps_heroes: "",
            support_heroes: "",
            owner: username,
            platform: "",
            cost: 1,
            pot: 0,
            locked: false,
            skill_range: { lower: 2000, upper: 3000 }
          } as IStack;
        } else {
          this.isEdit = true;
        }
      });


    }
  }

  handleEnter() {
    this.keyboard.close();
  }

  createStack() {
    if (!this.validateComp()) {
      return console.log("invalid comp");
    }

    this.stack.dateTime = firestore.FieldValue.serverTimestamp();
    if (!this.isEdit) {
      this.stacksCol.add(this.stack);
    } else {
      console.log(this.stackID);
      this.stacksCol.doc(String(this.stackID)).set(this.stack);
    }
    this.navCtrl.push('List1Page', { Id: this.ID });

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

  isValidForm():boolean {
    if (this.stack.description && this.stack.type && this.stack.comp && this.stack.platform) {
      return true;
    } else {
      return false;
    }
  }

  cancel() {
    this.navCtrl.push('List1Page', { Id: this.ID, user: this.user });
  }

  intToStr(num) {
    return String(num);
  }
}
