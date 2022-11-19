import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes : Cliente[] = [];
  clienteSelecionado : Cliente;
  mensagemSucesso : string;
  mensagemError : string;
  constructor(
    private service : ClientesService, 
    private router : Router){}
  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(response => this.clientes = response);
  }

  novoCadastro(){
    this.router.navigate(['clientes/form'])
  }

  preparaDelecao(cliente : Cliente){
    this.clienteSelecionado = cliente;
  }

  deletaCliente(){
    this.service.
    deletaClienteById(this.clienteSelecionado)
    .subscribe(response => {
      this.mensagemSucesso = 'Cliente deletado com sucesso'
      this.ngOnInit();
    },
    error => this.mensagemError = 'Ocorreu um erro em deletar o cliente'
    
    )
  }
}
