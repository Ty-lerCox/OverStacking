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
  comp = "" as String;
  stacksCol: AngularFirestoreCollection<IStack>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.ID = this.navParams.get('Id');
    this.stackID = this.navParams.get('stackId');
    this.stacksCol = this.navParams.get('stacksCol');

    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
      return;
    } else {

      this.stacksCol
        .doc(String(this.stackID))
        .ref
        .get()
        .then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.comp = doc.data().comp;
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
  }



  ionViewDidLoad() {
    this.comp = "";
  }

}
