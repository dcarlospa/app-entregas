import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validate } from '../../util/validate';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  contador = 0;
  email: string = '';
  senha = '';
  produtos : any;
  private senhaMestre = "123";

  constructor(
    private router: Router,
    public firestore: AngularFirestore
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
    console.log('entrando...');
    console.log(this.email, this.senha);
    this.firestore.collection('usuarios', 
      ref => ref.
        where('email', '==', this.email).
        where('senha', '==', this.senha).
        where('estaAtivo', '==', true).
        limit(6)
      ).valueChanges().subscribe( x => {
        console.log(x);
        if(x.length === 1){
          alert('bem vindo')
          this.router.navigateByUrl('home');
        }else{
          //não está logado
          alert('Você não está logado!');
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
  

}
