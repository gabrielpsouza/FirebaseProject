import { Injectable } from '@angular/core';
import { Contato } from "./contato";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase,) { }

//INSERE OS DADOS NA LISTA E NO FIREBASE
  insert(contato: Contato) {
    this.db.list('contato').push(contato).then((result: any) => {
      console.log(result.key);
    });
  }

//ALTERA OS DADOS NO FIREBASE
  update(contato: Contato, key: string) {
    this.db.list('contato').update(key, contato).catch((error: any) => {
      console.log(error);
    });
  }

//PUXA TODOS OS DADOS
  getAll() {
    return this.db.list('contato').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

//DELETA OS DADOS DE ACORDO COM A KEY
  delete(key: string) {
    this.db.object('contato/' + key).remove();
  }
}
