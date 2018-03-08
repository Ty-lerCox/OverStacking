import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
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
  heroes;
  tankCount: number;
  dpsCount: number;
  supportCount: number;
  uID;
  email;
  isAllowedToSelect: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, private afa: AngularFireAuth, public eventsCtrl: Events) {
    this.ID = this.navParams.get('Id');
    this.stackID = this.navParams.get('stackId');
    this.stacksCol = this.navParams.get('stacksCol');

    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
      return;
    } else {

      console.log(this.stacksCol);
      this.stacksCol.doc<IStack>(String(this.stackID)).valueChanges().subscribe(data => {
        this.stack = data;
        this.uID = this.afa.auth.currentUser.uid;
        this.email = this.afa.auth.currentUser.email;
        console.log(this.email);
        this.mapRequiredHeroes();
        this.isAllowedRoleSelect();
        console.log(data);
      });
    }
  }

  ionViewDidLoad() {
  }

  ionViewDidUnload() {
  }

  //Method to override the default back button action
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      this.stack = null;
      this.stacksCol = null;
      this.navCtrl.push('List1Page', {Id: this.ID });
   
    }
  }

  mapRequiredHeroes() {
    var oldData = this.heroes;
    this.heroes = [];
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
    var obj;
    for (let index = 0; index < this.tankCount; index++) {
      obj = {
        name: "Any Tank " + String(index + 1),
        checked: this.getChecked("Any Tank " + String(index + 1))
      }
      this.heroes.push(obj);
    }
    for (let index = 0; index < this.dpsCount; index++) {
      obj = {
        name: "Any DPS " + String(index + 1),
        checked: this.getChecked("Any DPS " + String(index + 1))
      }
      this.heroes.push(obj);
    }
    for (let index = 0; index < this.supportCount; index++) {
      obj = {
        name: "Any Support " + String(index + 1),
        checked: this.getChecked("Any Support " + String(index + 1))
      }
      this.heroes.push(obj);
    }

    var BreakException = {};
    if (this.stack.tank_heroes != "") {
      var heroes = this.stack.tank_heroes;
      for (let hero of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (String(item.name).substring(0, 8) == "Any Tank") {
              this.heroes[index].name = hero;
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
      for (let hero of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (String(item.name).substring(0, 7) == "Any DPS") {
              this.heroes[index].name = hero;
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
      for (let hero of heroes) {
        try {
          this.heroes.forEach((item, index) => {
            if (String(item.name).substring(0, 11) == "Any Support") {
              this.heroes[index].name = hero;
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      }
    }

    //recover old data after realtime update
    if (oldData != null) {
      try {
        oldData.forEach((item1, index1) => {
          if (item1.checked) {
            this.heroes.forEach((item2, index2) => {
              if (item1.name == item2.name) {
                this.stack.slots.forEach(slots => {
                  if (slots.name == item2.name) {
                    if (slots.userID != "") {
                      this.heroes[index2].checked = true;
                    }
                  }
                });
              }
            });
          }
        });
      } catch (e) {
      }
    }
      
    //mark heroes as unavailable
    try {
      this.stack.slots.forEach((slot, indexSlot) => {
        this.heroes.forEach((hero, indexHero) => {
          if (slot.name == hero.name) {
            if (slot.userID != "")
            {
              this.heroes[indexHero].checked = true;
            }
          }
        });
      });
    } catch (e) {
    }

  }

  getChecked(hero): boolean {
    var result = false;
    if (this.heroes == null) {
      return false;
    }

    try {
      // if user has already selected a slot
      this.stack.slots.forEach(slots => {
        if (slots.userID == this.uID) {
          if (slots.name == hero) {
            result = true;
          }
        }
      });
    } catch (e) {
      result = false;
    }
    return result;
  }

  isSlotDisabled(hero: string): boolean {
    var disabled = false;
    var hitBreaker = false;
    if (!this.stack.slots) {
      disabled = false;
    }
    try {   

      // if player has selected slot
      this.stack.slots.forEach(slot => {
        if (slot.userID == this.uID) {
          if (slot.name == hero) {
            disabled = false;
          } else {
            disabled = true;
            hitBreaker = true;
          }
        }
      });  
      if (hitBreaker) {
        return disabled;
      }
      // if slot is in stack
      this.stack.slots.forEach(slot => {
        if (slot.name == hero) {
          if (slot.userID != "") {
            if (slot.userID == this.uID) {
              disabled = false;
            } else {
              disabled = true;
              hitBreaker = true;
            }
          } else {
            disabled = true;
          }
        }
      });
    } catch (e) {
    }
    
    return disabled;
  }

  roleSelected(event: any, hero: string) {
    var index;
    this.heroes.forEach((item, i) => {
      if (item.name == hero) {
        index = i;
      }
    });
    var slots = this.stack.slots;
    if (!slots){
      slots = [];
    }
    if (this.heroes[index].checked) {
      slots.push({
        name: hero,
        userID: this.uID,
        username: this.email
      });
      return this.stacksCol.doc<IStack>(String(this.stackID)).update({
        slots: slots
      })
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    } else {
      try {
        slots.forEach((item, index) => {
          if (item.name == hero) {
            slots[index].name = "";
            slots[index].userID = "";
            slots[index].username = "";
          }
        });
        return this.stacksCol.doc<IStack>(String(this.stackID)).update({
          slots: slots
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      } catch (e) {
      }
    }
  }

  isAllowedRoleSelect() {
    this.stacksCol.doc<IStack>(String(this.stackID)).valueChanges().subscribe(data => {
      if (!data.slots) {
        this.isAllowedToSelect = true;
      }
      try {
        data.slots.forEach(x => {
          if (x.userID == this.uID) {
            this.isAllowedToSelect = false;
          }
        });
      } catch (e) {
      }
    });
    this.isAllowedToSelect = true;
  }


}
