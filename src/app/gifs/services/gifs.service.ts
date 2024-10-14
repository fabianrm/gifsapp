import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifResponse } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY = 'rgwQ3Aty8iLeTV1Pe9U20pA2KCyReeFd';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private _apiKey: string = 'rgwQ3Aty8iLeTV1Pe9U20pA2KCyReeFd';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient,) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }


  //Guardar en LocalStorage
  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //Cargar LocalStorage
  private loadLocalStorage() {
    const tempTags = localStorage.getItem('history');

    if (!tempTags) return;
    this._tagsHistory = JSON.parse(tempTags)

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }


  //Realiza la búsqueda
  searchTag(tag: string): void {
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<GifResponse>(`${this._serviceUrl}/search?`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      })
  }


}
