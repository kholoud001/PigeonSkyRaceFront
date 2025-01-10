import Keycloak from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    if (typeof window === 'undefined') {
      // Avoid initializing Keycloak in non-browser environments
      return Promise.resolve(false);
    }

    return keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'pigeonSecurity',
        clientId: 'spring-boot-app',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
      },
      loadUserProfileAtStartUp: true,
    });
  };
}
