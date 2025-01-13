import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakInstance: Keycloak;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'pigeonSecurity',
      clientId: 'spring-boot-app',
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      });

      if (authenticated) {
        console.log('User is authenticated');
        this.storeToken();
      } else {
        console.warn('User is not authenticated');
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      throw error;
    }
  }

  login(): Promise<void> {
    return this.keycloakInstance.login({
      redirectUri: window.location.origin
    });
  }

  logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return this.keycloakInstance.logout({
      redirectUri: window.location.origin
    });
  }

  refreshToken(): Promise<void> {
    return this.keycloakInstance.updateToken(70).then(() => {
      this.storeToken();
    }).catch(err => {
      console.error('Token refresh failed:', err);
      this.logout();
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getProfile(): Promise<any> {
    return this.keycloakInstance.loadUserProfile();
  }

  private storeToken(): void {
    localStorage.setItem('token', this.keycloakInstance.token || '');
    localStorage.setItem('refreshToken', this.keycloakInstance.refreshToken || '');
    console.log('Token stored:', this.keycloakInstance.token);
  }
}
