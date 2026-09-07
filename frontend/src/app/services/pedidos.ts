import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    // 1. La clave exacta de tu AccessToken en Session Storage
    const msalKey = 'msal.3|c7d79545-32db-494e-bace-f25daa398c07.72fd0b5a-8a6a-4cff-89f6-bde961f7e250|login.windows.net|accesstoken|ac0cd280-33b6-4d33-ae42-aa056c7029fa|14c021dd-6b1d-423e-a9f9-e59b17394821|api://ac0cd280-33b6-4d33-ae42-aa056c7029fa/access_as_user|';
   
    // 2. Obtenemos el texto de Session Storage (no de Local Storage)
    const msalData = sessionStorage.getItem(msalKey);
   
    let token = '';
    if (msalData) {
      // 3. Convertimos el texto a JSON y sacamos la propiedad "secret" (que es el token real)
      const parsedData = JSON.parse(msalData);
      token = parsedData.secret;
    }

    // 4. Armamos la cabecera
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

      return this.http.get<any[]>(`${environment.apiConfig.uri}/api/pedidos`, { headers });
  }
}