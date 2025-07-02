import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<KeycloakProfile | null> {
    try {
      if (this.isAuthenticated()) {
        return await this.keycloakService.loadUserProfile();
      }
      return null;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  }

  /**
   * Get user roles
   */
  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  /**
   * Check if user is debt officer
   */
  isDebtOfficer(): boolean {
    return this.hasRole('Debt Officer');
  }

  /**
   * Check if user is external agent
   */
  isExternalAgent(): boolean {
    return this.hasRole('External Agent');
  }

  /**
   * Get access token
   */
  async getToken(): Promise<string> {
    return this.keycloakService.getToken() || '';
  }

  /**
   * Login user
   */
  login(): Promise<void> {
    return this.keycloakService.login();
  }

  /**
   * Logout user
   */
  logout(): Promise<void> {
    return this.keycloakService.logout();
  }

  /**
   * Get username
   */
  getUsername(): string | undefined {
    return this.keycloakService.getUsername();
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    return this.keycloakService.isTokenExpired();
  }

  /**
   * Update token
   */
  updateToken(minValidity?: number): Promise<boolean> {
    return this.keycloakService.updateToken(minValidity);
  }
}

