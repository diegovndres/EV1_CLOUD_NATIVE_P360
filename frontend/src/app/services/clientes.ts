import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiConfig.clientesUri}/api/clientes`);
  }

  crear(cliente: any): Observable<any> {
    return this.http.post<any>(`${environment.apiConfig.clientesUri}/api/clientes`, cliente);
  }
}
