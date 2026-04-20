import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { AemetResponse } from '../models/aemet-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiempoService {
  private apiUrl = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/30030?api_key=';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTiempo() {
    return this.http.get<AemetResponse>(`${this.apiUrl}${this.apiKey}`).pipe(
      switchMap(respuesta => this.http.get<any>(respuesta.datos))
    );
  }
}