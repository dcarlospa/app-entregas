import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha = '';
  private senhaMestre = "123";

  constructor(
    private router: Router
  ) { 
    console.log(router.url);
  }

  ngOnInit() {
  }

  entrar(){
    console.log('entrando...');
    console.log(this.email, this.senha);
    if(this.validateEmail(this.email) && this.senha === this.senhaMestre)
      this.router.navigateByUrl('home');
    else
      alert('Dados incorretos');
  }

  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

}
