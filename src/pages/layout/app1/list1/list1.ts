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
  activePlatform;
  currentTime;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public loadingCtrl: LoadingController , public afs: AngularFirestore) {

    //**Loading Screen */
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    //** Stack Collection */
    this.ID = this.navParams.get('Id');
    this.user = this.navParams.get('user');
    if (this.ID == null) {
      this.navCtrl.push('Category1Page');
    } else {
      this.stacksCol = this.afs.collection('games').doc(String(this.ID)).collection('stacks', ref => ref.orderBy("dateTime", "desc").limit(30));
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

    this.currentTime = new Date().getTime();

    //** Exit */
    loadingPopup.dismiss();
  }

  ionViewDidLoad() {
    this.setBackButtonAction()
  }

  //Method to override the default back button action
  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.popToRoot();
    }
  }

  openStack(stackID) {
      this.navCtrl.push('Detail1Page', {Id: this.ID, stackId: stackID, stacksCol: this.stacksCol, user: this.user }); 
  }

  createNewStack() {
    this.navCtrl.push('Create1Page', {Id: this.ID, stacksCol: this.stacksCol, user: this.user });
  }

  onSegmentChange() {
    this.stacks = this.afs.collection('games').doc(String(this.ID)).collection('stacks', ref => ref.where("platform","==", this.activePlatform)).snapshotChanges()
      .map(actions => {
        return actions.map(prop => {
          const id = prop.payload.doc.id;
          const data = prop.payload.doc.data() as IStack;
          return { id, data }
        })
    })
  }

  getIcon(platform): string {
    switch (platform) {
      case "PlayStation":
        return "playstation";
      case "Xbox":
        return "xbox";
      case "PC":
        return "steam";
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  intToStr(num): String {
    return String(num);
  }
  
  getIconColor(platform) {
    var color = "#000";
    switch (platform) {
      case "PlayStation":
        color = "#1C99E5";
        break;
      case "Xbox":
        color = "#2EAF2C";
        break;
      case "PC":
        color = "#434343";
        break;
    }
    return {
      "color": color
    }
  }

  calcDiff(itemDate: Date): string {
    var itemTime = new Date(itemDate).getTime();
    var calc = Math.abs(itemTime - this.currentTime);
    var result: string;
    
    var mins = calc / 1000 / 60;
    var hours = calc / 1000 / 60 / 60;
    var days = calc / 1000 / 60 / 60 / 24;
    
    if (days > 1) {
      result = Math.floor(days) + " day" + ((Math.floor(days) > 1) ? "s" : "");
    } else if (hours > 1) {
      result = Math.floor(hours) + " hour" + ((Math.floor(hours) > 1) ? "s" : "");
    } else if (mins > 1) {
      result = Math.floor(mins) + " min" + ((Math.floor(mins) > 1) ? "s" : "");
    } else {
      result = "< 1min";
    }
    
    return result.toString();
  }
}
