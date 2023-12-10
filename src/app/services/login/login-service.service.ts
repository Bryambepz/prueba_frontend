import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseWS } from 'src/app/domains/responsews';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  url:string = environment.urlBackend+"login/";

  constructor(private http: HttpClient) { }

  getLogin(username: string, password: string): Observable<ResponseWS> {
    const urlEndpoint = this.url + "login";
    return this.http.get<ResponseWS>(urlEndpoint, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        user: username,
        password: password
      }
    })
  }
  
}
