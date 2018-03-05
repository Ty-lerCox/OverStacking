import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { IGame } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
  gamesCol: AngularFirestoreCollection<IGame>;
  games: any;
  activeMenu: string;
  user;


  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    //**Loading Screen */
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    this.activeMenu = "Basic";

    //** Game Collection */
    this.gamesCol = this.getGamesCol();
    this.games = this.gamesCol.snapshotChanges().map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as IGame;
            const id = action.payload.doc.id;
            return { id, data };
        });
    });


    //** Exit */
    loadingPopup.dismiss();

  }

  //*********** Open list page  **************/
  openList(Id) {
      this.navCtrl.push('List1Page', { Id: Id }); 
  }

  getGamesCol(): AngularFirestoreCollection<IGame> {
    return this.afs.collection('games', ref => ref.where("type", "==", this.activeMenu));
  }

  onSegmentChange() {
    this.gamesCol = this.getGamesCol();
    this.games = this.gamesCol.snapshotChanges().map(actions => {
        return actions.map(action => {
            const data = action.payload.doc.data() as IGame;
            const id = action.payload.doc.id;
            return { id, data };
        });
    });

  }


}
