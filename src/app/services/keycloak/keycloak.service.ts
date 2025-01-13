import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';

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

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      });
      console.log('Authenticated:', authenticated);

      if (authenticated) {
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.error('Initialization Error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      } else {
        console.error('Unknown error type:', typeof error);
      }
      throw error;
    }
  }

  login() {
    return this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  logout() {
    return this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  refreshToken() {
    return this.keycloak.updateToken(70);
  }
}

