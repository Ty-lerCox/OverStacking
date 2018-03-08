import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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


  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afs: AngularFirestore, public afAuth: AngularFireAuth, public toaster: ToastController) {

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

    if (this.navParams.get("action") == "updatedProfile")
    {
      let toast = this.toaster.create({
        message: "Profile Has Been Updated!",
        duration: 3000
      })
      toast.present();
    } else if (this.navParams.get("action") == "updateProfile") {
      let toast = this.toaster.create({
        message: "You're unable to create a stack until you have created a username.\nHead back to the games page, click the menu button in the top left, and then click 'Profile' settings.",
        duration: 10000,
        showCloseButton: true
      })
      toast.present();
    } else {
    }

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

  signout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("MainPage");
  }


}
