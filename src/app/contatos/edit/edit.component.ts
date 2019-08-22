import { Component, OnInit } from '@angular/core';
import { Contato } from "../service/contato";
import { ContatoService } from "../service/contato.service";
import { ContatoDataService } from "../service/contato-data.service";
import * as inputmask from "inputmask";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contato: Contato
  key: string = '';

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit() {
    inputmask().mask(document.querySelectorAll("input"));
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if(data.contato && data.key) {
        this.contato = new Contato();
        this.contato.nome = data.contato.nome;
        this.contato.telefone = data.contato.telefone;
        this.key = data.key;
      }
    });
  }

  onSubmit(){
    if(this.key) {
      this.contatoService.update(this.contato, this.key);
    } else {
      this.contatoService.insert(this.contato);
    }
    this.contato = new Contato();
  }

  //NÃO TERMINEI
  tel(telefone){
    telefone = telefone.replace("(","");
    telefone = telefone.replace(")","");
    telefone = telefone.replace("-","");
    telefone = telefone.replace(" ","");
    console.log(telefone);
    console.log(telefone.length);

    if(telefone.length == 11){
      telefone = telefone.split("");
      let number1 = telefone[0];
      let number2 = telefone[1];
      telefone = '(' + number1 + number2 + ')';
      
    }
   }
}
