import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/domains/Persona';
import { ResponseWS } from 'src/app/domains/responsews';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  
  url = environment.urlBackend+"persona/";
  
  constructor(private http: HttpClient) { }

  createPersona(persona: Persona): Observable<ResponseWS> {
    const urlPersonas = this.url + "create-persona";
    return this.http.post<ResponseWS>(urlPersonas, persona, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  updatePersona(empresa: Persona): Observable<ResponseWS> {
    const urlPersonas = this.url + "update-persona";
    return this.http.put<ResponseWS>(urlPersonas, empresa, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  deletePersona( id:number ): Observable<ResponseWS> {
    const urlPersonas = this.url + "delete-persona";
    return this.http.delete<ResponseWS>(urlPersonas, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        id: id
      }
    })
  }

  getPersonas():Observable<ResponseWS> {
    const urlPersonas = this.url + "read-personas"
    return this.http.get<ResponseWS>(urlPersonas, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
