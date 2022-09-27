import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Validate } from '../../util/validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  senha = '';
  senhaRepetida = '';
  habilitaSalvar = false;
  loading: HTMLIonLoadingElement;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    setInterval(()=>{
      this.habilitaSalvar=!this.habilitaSalvar;
    }, 500);
  }

  registrar(){
    this.presentAlert();
  }

  canSave(): boolean{
    return Validate.validateEmail(this.email)  && 
    this.senha===this.senhaRepetida && 
    this.senha.length >= 3
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirme os dados',
      message: 'Leia seus dados atentamente e confirme: seus dados estão corretos?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('O leso cancelou...')
          }
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            this.showLoading();
            setTimeout( async () => {
              await this.fecharLoading();
            },
            2000)
            console.log('O leso confirmou!')
            console.log('cadastrando...');
            console.log(this.email, this.senha, this.senhaRepetida);
            if(Validate.validateEmail(this.email) && this.senha === this.senhaRepetida){
              this.presentToast('Bem vindo!');
              this.router.navigateByUrl('home');
            }
            else{
              this.presentToast('Dados inválidos!');
            }
            
          }
        },
      ],

    });

    await alert.present();
  }

  async presentToast( mensagem: string ) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    this.loading.present();
  }

  private async fecharLoading(){
    await this.loading.dismiss();
  }
}
