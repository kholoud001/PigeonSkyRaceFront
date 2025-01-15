import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {KeycloakService} from '../../keycloak/keycloak.service';

export interface UserDisplayDTO {
  username: string;
  roleType: string;
  colombierName: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
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

  getUsers(): Observable<UserDisplayDTO[]> {
    return this.http.get<UserDisplayDTO[]>(`${this.baseUrl}/admin/allUsers`, {
      headers: this.getHeaders(),
      responseType: 'json'
    });
  }

  changeUserRole(username: string, newRole: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('newRole', newRole);

    return this.http.post(`${this.baseUrl}/admin/changeUserRole`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text',
    });
  }

  searchUsers(searchTerm: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/searchUsers?searchTerm=${searchTerm}`, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/deleteUser/${userId}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
