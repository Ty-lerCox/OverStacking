import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public registerForm;
  public backgroundImage: any = "./assets/bg2.jpg";

  constructor(public nav: NavController, public afAuth: AngularFireAuth, public fb: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      
      this.registerForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  
  }

  registerUser(){
    console.log("call signopUser");
    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
      this.presentAlert("invalid form");
    } else {

      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: 'Creating..'
      });
      loadingPopup.present();

      this.afAuth.auth.createUserWithEmailAndPassword(
          this.registerForm.value.email, 
          this.registerForm.value.password)
      .then(() => {
          loadingPopup.dismiss();
          this.nav.setRoot('Category1Page');
      }, (error) => { 
         var errorMessage: string = error.message;
          loadingPopup.dismiss();
          this.presentAlert(errorMessage);      
      });

    }
  }
  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }
}
