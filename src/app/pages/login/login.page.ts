import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: HTMLIonLoadingElement;
  contador = 0;
  email: string = '';
  senha = '';
  produtos : any;
  private senhaMestre = "123";

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { 
    console.log(router.url);
    firestore.collection('produtos', ref => ref.limit(10).orderBy('valor', 'desc')).valueChanges().subscribe( x => {
      this.produtos = x;
      console.log(x);
    });

    console.log(this.produtos)
  }

  ngOnInit() {
  }

  entrar(){
    this.showLoading();
    console.log('entrando...');
    console.log(this.email, this.senha);
    this.firestore.collection('usuarios', 
      ref => ref.
        where('email', '==', this.email).
        where('senha', '==', this.senha).
        where('estaAtivo', '==', true).
        limit(6)
      ).valueChanges().subscribe( async x => {
        console.log(x);
        await this.fecharLoading();

        if(x.length === 1){
          this.presentToast('Bem vindo!');
          this.router.navigateByUrl('home');
        }else{
          this.presentToast('Usuário ou senha incorretos!');
          this.router.navigateByUrl('login');

        }
      })
    /*
    if(Validate.validateEmail(this.email) && this.senha === this.senhaMestre)
      this.router.navigateByUrl('home');
    else
      alert('Dados incorretos');
      */
  }
 

  getEmailMaiusculo(){
    return this.email.toUpperCase();
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

  async presentToast( mensagem: string ) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
  

}
