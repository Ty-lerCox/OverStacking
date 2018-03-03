import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
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

    this.ID = "0";
    //** Stack Collection */
    this.stacksCol = this.afs.collection('games').doc(this.ID).collection('stacks');
    this.stacks = this.stacksCol.valueChanges();

    //** Exit */
    loadingPopup.dismiss();
  }

  goToDetail(itemId){
      this.navCtrl.push('Detail1Page',{itemId:itemId}); 
  }

  createNewStack() {
    this.navCtrl.push('Create1Page', {Id: this.ID, stacksCol: this.stacksCol });
  }

}
