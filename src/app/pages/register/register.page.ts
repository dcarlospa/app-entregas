import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    setInterval(()=>{
      this.habilitaSalvar=!this.habilitaSalvar;
    }, 500);
  }

  registrar(){
    console.log('cadastrando...');
    console.log(this.email, this.senha, this.senhaRepetida);
    if(Validate.validateEmail(this.email) && this.senha === this.senhaRepetida)
      this.router.navigateByUrl('home');
    else
      alert('Dados incorretos');
  }

  canSave(): boolean{
    return Validate.validateEmail(this.email)  && 
    this.senha===this.senhaRepetida && 
    this.senha.length >= 3
  }

}
