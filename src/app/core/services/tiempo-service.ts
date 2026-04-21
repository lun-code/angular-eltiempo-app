import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { AemetResponse } from '../models/aemet-response';
import { environment } from '../../../environments/environment';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root',
})
export class TiempoService {
  private base = 'https://opendata.aemet.es/opendata/api';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getMunicipios() {
    return this.http
      .get<AemetResponse>(`${this.base}/maestro/municipios?api_key=${this.apiKey}`)
      .pipe(
        switchMap(r => this.http.get<any[]>(r.datos)),
        map(lista => // Usamos map para dejar solo los datos necesarios para el componente
          lista.map(m => ({
            id: m.id,
            nombre: m.nombre,
            codigoMunicipio: (m.id as string).replace('id', ''),
          } as Municipio))
        )
      );
  }

  getTiempo(codigoMunicipio: string) {
    const url = `${this.base}/prediccion/especifica/municipio/diaria/${codigoMunicipio}?api_key=${this.apiKey}`;
    return this.http
      .get<AemetResponse>(url)
      .pipe(switchMap(r => this.http.get<any>(r.datos)));
  }
}