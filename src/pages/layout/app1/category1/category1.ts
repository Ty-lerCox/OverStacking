import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IGame } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
  gamesCol: AngularFirestoreCollection<IGame>;
  games: Observable<IGame[]>;


  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afs: AngularFirestore) {

    //**Loading Screen */
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    //** Game Collection */
    this.gamesCol = this.afs.collection('games');//.doc('0').collection('stacks');
    this.games = this.gamesCol.valueChanges();

    //** Exit */
    loadingPopup.dismiss();

  }

  //*********** Open list page  **************/
  openList(Id) {
      console.log("openList");
      this.navCtrl.push('List1Page', {Id:Id}); 
  }


}
