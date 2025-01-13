import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:8443';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.keycloakService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };

    return new HttpHeaders(headers);
  }

  getAdminData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/manage`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }



}
