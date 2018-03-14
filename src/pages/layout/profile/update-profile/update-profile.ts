import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ToastController } from 'ionic-angular';
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

  constructor(private toast: ToastController, private keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.getProfileData();
    document.addEventListener('keydown', (key) => {this.handleEnter(key)} );
  }

  handleEnter(key) {
    //console.log(key.keyCode);
    if (key.keyCode == 13) {
      this.keyboard.close();
    }
    //this.code = key.keyCode;
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

    this.afs.collection("profiles", ref => ref.where("Username", "==", this.profile.Username)).snapshotChanges().subscribe(data => {
      if (data[0] == null) {
        this.updateProfile();
        return;
      }
      var id = data[0].payload.doc.id;
      // if username exists
      if (id) {
        console.log("user exists");
        // if ID == user's ID
        if (id == this.afAuth.auth.currentUser.uid) {
          // allow update
            this.updateProfile();
        } else {
          // disallow update
          this.toast.create({
            message: "Username is already taken.",
            duration: 2000
          }).present();
        }
      } else {
        // allow update
        console.log(id);
        this.updateProfile();
      }
    });
  }

  async updateProfile() {
    this.afs.collection("profiles").doc<IProfile>(this.afAuth.auth.currentUser.uid).set(this.profile)
    .then(() => {
      let options = {
        action: "updatedProfile"
      } as NavOptions;
      this.navCtrl.setRoot("Category1Page", options);
    });
  }

  cancel() {
    let options = {
    } as NavOptions;
    this.navCtrl.setRoot("Category1Page", options);
  }

}
