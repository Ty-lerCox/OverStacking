import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { IProfile } from '../../../../app/app.interfaces';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  profile: IProfile;

  constructor(private keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.getProfileData();
  }

  handleEnter() {
    this.keyboard.close()
  }

  async getProfileData() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.afs.collection("profiles").doc<IProfile>(this.afAuth.auth.currentUser.uid).valueChanges().subscribe(data => {
          if (data) {
            this.profile = data;
          } else {
            this.profile = {} as IProfile;
            this.profile.Beers = 100;
          }
        });
      } else {
        this.navCtrl.popToRoot();
      }
    });
  }

  update() {
    console.log(this.profile);
    this.afs.collection("profiles").doc<IProfile>(this.afAuth.auth.currentUser.uid).set(this.profile)
      .then(() => {
        let options = {
          action: "updatedProfile"
        } as NavOptions;
        this.navCtrl.setRoot("Category1Page", options);
      })
  }

  cancel() {
    let options = {
    } as NavOptions;
    this.navCtrl.setRoot("Category1Page", options);
  }

}
