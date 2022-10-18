import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  nome = '';
  senha = '';
  senhaRepetida = '';
  habilitaSalvar = false;
  loading: HTMLIonLoadingElement;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
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
    this.senha.length >= 6
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
            await this.showLoading();
            try{
              const result = await this.fireAuth.createUserWithEmailAndPassword(this.email, this.senha);
              console.log(result);
              const uid = result.user.uid;
              this.firestore.collection('usuarios').doc(uid).set({email: this.email, nome: this.nome, pontos: 0, desconto: 10, endereco: '', bloqueado: false });
              this.router.navigateByUrl('login');
              this.presentToast('Usuário criado com sucesso. Agora faça o login para acessar o sistema!');
            }
            catch(deuErro){
              console.log(JSON.stringify(deuErro));
              if(deuErro.code === 'auth/email-already-in-use'){
                this.presentToast('Este e-mail já está sendo utilizado!');
              }else if(deuErro.code === 'auth/weak-password'){
                this.presentToast('Senha fraca. Tente outra senha!');
              }else{ 
                this.presentToast('Erro desconhecido.');
              }
              
            }
            await this.fecharLoading();
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
