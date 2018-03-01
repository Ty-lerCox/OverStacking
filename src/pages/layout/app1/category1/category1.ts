import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { ICategory } from '../../../../app/app.interfaces'

@IonicPage()
@Component({
  selector: 'page-category1',
  templateUrl: 'category1.html'
})
export class Category1Page {
  categories;

  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    afDB.list<ICategory>('/categories').valueChanges().subscribe(data => {
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
