import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database-deprecated';

import { ICategory, IStack } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
  categories: any[] = [];

  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.afDB.list('/categories').subscribe(categoryItems => {
      this.categories = categoryItems;
      console.log(categoryItems);
      loadingPopup.dismiss();
    });
  }

  //*********** Open list page  **************/
  openList(Id){
      console.log("openList");
      this.navCtrl.push('List1Page',{Id:Id}); 
  }


}
