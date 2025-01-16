import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakService} from '../../keycloak/keycloak.service';
import {Observable} from 'rxjs';


export interface Colombier {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface Pigeon {
  id: number | null;
  age: number | null;
  color: string;
  ringNumber?: string;
  userId?: number;
  gender?:string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = 'https://localhost:8443/user';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  private getHeaders(): HttpHeaders {
    const token = this.keycloakService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    return new HttpHeaders(headers);
  }

  addColombier(colombier: Colombier): Observable<Colombier> {
    return this.http.post<Colombier>(`${this.baseUrl}/add/colombier`, colombier, {
      headers: this.getHeaders(),
    });
  }

  getColombierById(id: number): Observable<Colombier> {
    return this.http.get<Colombier>(`${this.baseUrl}/colombier/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateColombier(id: number, colombier: Colombier): Observable<Colombier> {
    return this.http.put<Colombier>(`${this.baseUrl}/update/colombier/${id}`, colombier, {
      headers: this.getHeaders(),
    });
  }

  deleteColombier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/colombier/${id}`, {
      headers: this.getHeaders(),
    });
  }


  addPigeon(pigeon: Pigeon, username: string): Observable<Pigeon> {
    const url = `${this.baseUrl}/add/pigeons?username=${username}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Pigeon>(url, pigeon, { headers });
  }

  getPigeonById(id: number): Observable<Pigeon> {
    return this.http.get<Pigeon>(`${this.baseUrl}/pigeon/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getAllPigeons(): Observable<Pigeon[]> {
    return this.http.get<Pigeon[]>(`${this.baseUrl}/pigeons`, {
      headers: this.getHeaders(),
    });
  }

  updatePigeon(id: number , pigeon: Pigeon): Observable<Pigeon> {
    return this.http.put<Pigeon>(`${this.baseUrl}/update/pigeon/${id}`, pigeon, {
      headers: this.getHeaders(),
    });
  }

  deletePigeon(id: number ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/pigeon/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getMyColombiers(username: string): Observable<Colombier[]> {
    return this.http.get<Colombier[]>(`${this.baseUrl}/my-colombiers?username=${username}`, {
      headers: this.getHeaders(),
    });
  }

  getMyPigeons(username: string): Observable<Pigeon[]> {
    return this.http.get<Pigeon[]>(`${this.baseUrl}/my-pigeons?username=${username}`, {
      headers: this.getHeaders(),
    });
  }

  getAllColombiers() {

  }
}
