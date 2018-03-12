import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';

//***********  Angularfire2 v5 **************/
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';

//*********** Provider **************/
import { AuthData } from '../providers/auth-data';

//************** import image gallery *********************//
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


//********** firebase configuration  ************ */
export const config = {
  apiKey: "AIzaSyCujptvzOVPjCwr9aIj-iKCtq2ztuzTYUs",
  authDomain: "overstacking2.firebaseapp.com",
  databaseURL: "https://overstacking2.firebaseio.com",
  projectId: "overstacking2",
  storageBucket: "overstacking2.appspot.com",
  messagingSenderId: "783653235052"
};
  
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp),
  
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    Geolocation,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
