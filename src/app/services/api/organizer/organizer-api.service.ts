import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../../keycloak/keycloak.service';

export interface Competition {
  id: number | null;
  name: string;
  latitude: number;
  longitude: number;
  departureTime: string;
  pigeonCount: number;
  percentage: number;
  releasePlace: string;
  userId: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class OrganizerApiService {
  private baseUrl = 'https://localhost:8443/organizer';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  private getHeaders(): HttpHeaders {
    const token = this.keycloakService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    return new HttpHeaders(headers);
  }

  addCompetition(competition: Competition, username: string): Observable<Competition> {
    const url = `${this.baseUrl}/add/competition?username=${username}`;
    return this.http.post<Competition>(url, competition, { headers: this.getHeaders() });
  }

  getAllCompetitions(): Observable<Competition[]> {
    const url = `${this.baseUrl}/competitions`;
    return this.http.get<Competition[]>(url, { headers: this.getHeaders() });
  }

  getCompetitionById(id: number): Observable<Competition> {
    const url = `${this.baseUrl}/competition/${id}`;
    return this.http.get<Competition>(url, { headers: this.getHeaders() });
  }

  updateCompetition(id: number, competition: Competition): Observable<Competition> {
    const url = `${this.baseUrl}/update/competition/${id}`;
    return this.http.put<Competition>(url, competition, { headers: this.getHeaders() });
  }

  deleteCompetition(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/competition/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
