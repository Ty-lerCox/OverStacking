import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController, Navbar } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { IStack } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-list1',
  templateUrl: 'list1.html'
})
export class List1Page {
  @ViewChild(Navbar) navBar: Navbar;
  ID:any;
  stacksCol: AngularFirestoreCollection<IStack>;
  stacks: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public loadingCtrl: LoadingController , public afs: AngularFirestore) {

    //**Loading Screen */
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    //** Stack Collection */
    this.ID = this.navParams.get('Id');
    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
    } else {
      this.stacksCol = this.afs.collection('games').doc(String(this.ID)).collection('stacks');
      //this.stacks = this.stacksCol.valueChanges();
      this.stacks = this.stacksCol.snapshotChanges()
      .map(actions => {
        return actions.map(prop => {
          const id = prop.payload.doc.id;
          const data = prop.payload.doc.data() as IStack;
          return { id, data }
        })
      })
    }

    //** Exit */
    loadingPopup.dismiss();
  }

  ionViewDidLoad() {
    this.setBackButtonAction()
  }

  //Method to override the default back button action
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.push('Category1Page');
    }
  }

  openStack(stackID) {
      this.navCtrl.push('Detail1Page', {Id: this.ID, stackId: stackID, stacksCol: this.stacksCol }); 
  }

  createNewStack() {
    this.navCtrl.push('Create1Page', {Id: this.ID, stacksCol: this.stacksCol });
  }
}
