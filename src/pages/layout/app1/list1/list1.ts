import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-list1',
  templateUrl: 'list1.html'
})
export class List1Page {
  @ViewChild('map') map3Element: ElementRef;
  ID:any;
  stacks;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public loadingCtrl: LoadingController , public afDB: AngularFireDatabase) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.ID = this.navParams.get('Id');
    if (!this.ID) {
      this.ID = 0;
    }

      afDB.list<any>('/stacks', ref => ref.orderByChild('category').equalTo(this.ID)).valueChanges().subscribe(data => {
        this.stacks = data;
        loadingPopup.dismiss();
      });
  }
  goToDetail(itemId){
      this.navCtrl.push('Detail1Page',{itemId:itemId}); 
  }

  createNewStack() {
    this.navCtrl.push('Create1Page', {Id: this.ID });
  }


 showMap() {
    let mapModal = this.modalCtrl.create('ListMap1Page', { 
    categoryId:this.ID
    });
    //let profileModal = this.modalCtrl.create(MapDetailPage, {lat: deviceNum,lng:lng});
    mapModal.present();
 }

}
