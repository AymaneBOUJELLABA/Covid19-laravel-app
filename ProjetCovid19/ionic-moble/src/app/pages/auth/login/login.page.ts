import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public error = null;
  hasInfo = 'false';
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  } 

  login(form: NgForm)
  {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Connecté !");
      },
      error => {
        // this.alertService.presentToast(error.error.error);
        this.handleError(error);
        console.log(error);
      },
      () => {
        this.dismissLogin();

      }
    );
    
    this.authService.hasInfos(this.authService.userValue.id).subscribe(
      data => {
        this.hasInfo = data['hasInfos'];
        if(this.hasInfo=='true')
          this.navCtrl.navigateRoot('/dashboard');
        if(this.hasInfo=='false')
          {
            this.navCtrl.navigateRoot('/infos');
          }
      },
      err => {
        console.log(err);
        
      }
    )    
  }

  // ---- Affichage du message d'erreur ----
  handleError(error) {
    this.error = error.error.error;
  }

}
