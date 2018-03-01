import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable , FirebaseObjectObservable} from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
// import { GalleryModal } from 'ionic-gallery-modal';
// declare var google;

@IonicPage()
@Component({
  selector: 'page-list1',
  templateUrl: 'list1.html'
})
export class List1Page {
  @ViewChild('map') map3Element: ElementRef;
  ID:any;
  stacks: any[] = [];

  viewMode: string = "map";
  map: any;
  mapList: FirebaseListObservable<any[]>;
  mapListArray : any=[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public loadingCtrl: LoadingController , public afDB: AngularFireDatabase) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
      this.ID = this.navParams.get('Id');
      this.afDB.list('/stacks', {query: {
          orderByChild: "category",
          equalTo:  parseInt(this.ID)
      }}).subscribe(listItems => {
          this.stacks = listItems;
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
