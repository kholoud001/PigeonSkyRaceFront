import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    if (typeof window === 'undefined') {
      console.warn('Keycloak initialization skipped: Not in a browser environment.');
      return Promise.resolve(false);
    }
    

    return keycloak
      .init({
        config: {
          url: 'http://localhost:8080/',
          realm: 'pigeonSecurity',
          clientId: 'spring-boot-app',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        loadUserProfileAtStartUp: true,
      })
      .then(authenticated => {
        console.log('Keycloak initialization successful. Authenticated:', authenticated);

        // Fetch the token after initialization
        const token = keycloak.getToken();
        console.log('Access Token:', token);

        return authenticated;
      })
      .catch(error => {
        console.error('Keycloak initialization failed:', error);
        return false;
      });
  };
}
