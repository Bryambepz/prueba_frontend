import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/domains/Empresa';
import { ResponseWS } from 'src/app/domains/responsews';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServiceService {
  url = environment.urlBackend+"empresa/";

  constructor(private http: HttpClient) { }

  createEmpresa(empresa: Empresa): Observable<ResponseWS> {
    const ulEmpresas = this.url + "create-empresa";
    return this.http.post<ResponseWS>(ulEmpresas, empresa, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  updateEmpresa(empresa: Empresa): Observable<ResponseWS> {
    const ulEmpresas = this.url + "update-empresa";
    return this.http.put<ResponseWS>(ulEmpresas, empresa, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  deleteEmpresa( id:number ): Observable<ResponseWS> {
    const ulEmpresas = this.url + "delete-empresa";
    return this.http.delete<ResponseWS>(ulEmpresas, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        id: id
      }
    })
  }

  getEmpresas():Observable<ResponseWS> {
    const urlEmpresas = this.url + "read-empresa"
    return this.http.get<ResponseWS>(urlEmpresas, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getEmpresasPersonas(): Observable<ResponseWS> {
    const urlEmpresas = this.url + "empresas-personas"
    return this.http.get<ResponseWS>(urlEmpresas, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
