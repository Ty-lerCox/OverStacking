import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'MainPage';
  menu:Array<any> = [];
  pages: Array<any>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.initializeApp();

    this.menu = [
    ];

    this.pages = [ 
      { icon:'game-controller-b', title:'Games', component: "Category1Page" },
      { icon:'person', title:'Profile', component: "UpdateProfilePage" },
      { icon:'paper-plane', title:'Feedback', component: "UpdateFeedbackPage" }
      
    ];

  }

  signout() {
    this.afAuth.auth.signOut();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
        menu.icon = 'ios-add-outline';
    } else {
        menu.showDetails = true;
        menu.icon = 'ios-remove-outline';
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // page.component = item array.component --> 
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page.component);
  }

}
