import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

import { ICategory, IStack } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
  categories;

  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    afDB.list<any>('/categories').valueChanges().subscribe(data => {
      this.categories = data
      loadingPopup.dismiss();
    });

  }

  //*********** Open list page  **************/
  openList(Id) {
      console.log("openList");
      this.navCtrl.push('List1Page',{Id:Id}); 
  }


}
