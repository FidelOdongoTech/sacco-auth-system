import { KeycloakConfig } from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'SaccoRealm',
  clientId: 'sacco-app'
};

