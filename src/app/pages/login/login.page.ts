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

  email: string = '';
  senha = '';
  produtos : any;
  private senhaMestre = "123";

  constructor(
    private router: Router,
    firestore: AngularFirestore
  ) { 
    console.log(router.url);
    this.produtos = firestore.collection('produtos').valueChanges();
    console.log(this.produtos)
  }

  ngOnInit() {
  }

  entrar(){
    console.log('entrando...');
    console.log(this.email, this.senha);
    if(Validate.validateEmail(this.email) && this.senha === this.senhaMestre)
      this.router.navigateByUrl('home');
    else
      alert('Dados incorretos');
  }
 

  

}
