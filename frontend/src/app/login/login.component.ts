import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  username : string;
  password : string;
  cadastrando : boolean;
  msgSuccess : string;
  errors:string[];

  constructor(
    private router : Router,
    private authService : AuthService

  ) { }

  onSubmit(){
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token)
        console.log('sucesso' + response);
        this.router.navigate(['/home'])
      }, errorResponse => {
        console.log('error ' + errorResponse);
        this.errors = ['Usuario ou Senha incorretos'];
      })
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }
  cancelaCadastro(){
    this.cadastrando = false;
  }
  cadastrarUsuario(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario)
      .subscribe( response => {
        this.msgSuccess = "Cadastro realizado com sucesso efetue o login";
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.errors = [];
        
      }, erroResponse => {
        this.errors = erroResponse.error.errors;
        this.msgSuccess = null;
      })
  }
}
