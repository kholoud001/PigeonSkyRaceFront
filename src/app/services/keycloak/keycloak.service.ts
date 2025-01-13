import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'pigeonSecurity',
        clientId: 'spring-boot-app',
      });
    }
    return this._keycloak;
  }

  async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
      });

      if (authenticated) {
        console.log('Authenticated successfully');
        console.log('Token:', this.keycloak.token);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Initialization Error:', error);
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
}

