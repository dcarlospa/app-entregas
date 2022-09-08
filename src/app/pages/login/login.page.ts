import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validate } from '../../util/validate';

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
    if(Validate.validateEmail(this.email) && this.senha === this.senhaMestre)
      this.router.navigateByUrl('home');
    else
      alert('Dados incorretos');
  }
 

  

}
