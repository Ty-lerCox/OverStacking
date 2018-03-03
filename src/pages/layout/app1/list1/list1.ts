import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController, Navbar } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
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
  stacks: Observable<IStack[]>;

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
      this.stacks = this.stacksCol.valueChanges();
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

  goToDetail(itemId){
      this.navCtrl.push('Detail1Page', {itemId:itemId}); 
  }

  createNewStack() {
    this.navCtrl.push('Create1Page', {Id: this.ID, stacksCol: this.stacksCol });
  }

}
