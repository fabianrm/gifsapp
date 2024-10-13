import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]; //Getter que retorna una copia
  }

  //Organiza la lista, evitando duplicados
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag); //agrega a la primera posicion del array
    this._tagsHistory = this._tagsHistory.splice(0, 10); //recortamos a solo 10 elementos
  }

  //Realiza la búsqueda
  searchTag(tag: string): void {
    if (!tag) return;
    this.organizeHistory(tag);
  }


}
