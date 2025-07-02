import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>Sacco Debt Management Dashboard</h1>
          <div class="user-info">
            <span class="welcome-text">Welcome, {{ userProfile?.firstName || userProfile?.username || 'User' }}!</span>
            <button class="logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </header>

      <main class="dashboard-main">
        <div class="user-card">
          <h2>User Information</h2>
          <div class="user-details">
            <div class="detail-item">
              <label>Username:</label>
              <span>{{ userProfile?.username || 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>Email:</label>
              <span>{{ userProfile?.email || 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>First Name:</label>
              <span>{{ userProfile?.firstName || 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>Last Name:</label>
              <span>{{ userProfile?.lastName || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <div class="roles-card">
          <h2>Your Roles</h2>
          <div class="roles-list">
            <span 
              *ngFor="let role of userRoles" 
              class="role-badge"
              [class.admin]="role === 'Admin'"
              [class.debt-officer]="role === 'Debt Officer'"
              [class.external-agent]="role === 'External Agent'">
              {{ role }}
            </span>
            <span *ngIf="userRoles.length === 0" class="no-roles">No roles assigned</span>
          </div>
        </div>

        <div class="permissions-card">
          <h2>Access Permissions</h2>
          <div class="permissions-grid">
            <div class="permission-item" [class.granted]="authService.isAdmin()">
              <span class="permission-icon">👑</span>
              <span class="permission-text">Admin Dashboard</span>
              <span class="permission-status">{{ authService.isAdmin() ? 'Granted' : 'Denied' }}</span>
            </div>
            <div class="permission-item" [class.granted]="authService.isDebtOfficer()">
              <span class="permission-icon">📊</span>
              <span class="permission-text">Debt Management</span>
              <span class="permission-status">{{ authService.isDebtOfficer() ? 'Granted' : 'Denied' }}</span>
            </div>
            <div class="permission-item" [class.granted]="authService.isExternalAgent()">
              <span class="permission-icon">🔗</span>
              <span class="permission-text">External Services</span>
              <span class="permission-status">{{ authService.isExternalAgent() ? 'Granted' : 'Denied' }}</span>
            </div>
          </div>
        </div>

        <div class="actions-card">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <button 
              class="action-btn admin-action" 
              [disabled]="!authService.isAdmin()"
              (click)="navigateToAdmin()">
              <span class="action-icon">⚙️</span>
              Admin Panel
            </button>
            <button 
              class="action-btn debt-action" 
              [disabled]="!authService.isDebtOfficer()"
              (click)="navigateToDebtManagement()">
              <span class="action-icon">💰</span>
              Debt Management
            </button>
            <button 
              class="action-btn agent-action" 
              [disabled]="!authService.isExternalAgent()"
              (click)="navigateToExternalServices()">
              <span class="action-icon">🌐</span>
              External Services
            </button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: #f8fafc;
    }

    .dashboard-header {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 16px 0;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard-header h1 {
      color: #1e293b;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .welcome-text {
      color: #64748b;
      font-weight: 500;
    }

    .logout-btn {
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .logout-btn:hover {
      background: #dc2626;
    }

    .dashboard-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .user-card, .roles-card, .permissions-card, .actions-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .user-card h2, .roles-card h2, .permissions-card h2, .actions-card h2 {
      color: #1e293b;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .detail-item label {
      font-weight: 500;
      color: #64748b;
    }

    .detail-item span {
      color: #1e293b;
    }

    .roles-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .role-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      background: #e2e8f0;
      color: #475569;
    }

    .role-badge.admin {
      background: #fef3c7;
      color: #92400e;
    }

    .role-badge.debt-officer {
      background: #dbeafe;
      color: #1e40af;
    }

    .role-badge.external-agent {
      background: #d1fae5;
      color: #065f46;
    }

    .no-roles {
      color: #94a3b8;
      font-style: italic;
    }

    .permissions-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .permission-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .permission-item.granted {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }

    .permission-icon {
      font-size: 20px;
    }

    .permission-text {
      flex: 1;
      font-weight: 500;
      color: #1e293b;
    }

    .permission-status {
      font-size: 12px;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 12px;
      background: #ef4444;
      color: white;
    }

    .permission-item.granted .permission-status {
      background: #22c55e;
    }

    .actions-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      background: #f1f5f9;
      color: #64748b;
    }

    .action-btn:not(:disabled) {
      background: #4f46e5;
      color: white;
    }

    .action-btn:not(:disabled):hover {
      background: #4338ca;
      transform: translateY(-1px);
    }

    .action-btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .action-icon {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .dashboard-main {
        grid-template-columns: 1fr;
        padding: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userProfile: KeycloakProfile | null = null;
  userRoles: string[] = [];

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    try {
      this.userProfile = await this.authService.getUserProfile();
      this.userRoles = this.authService.getUserRoles();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  navigateToAdmin() {
    // Navigate to admin panel
    console.log('Navigating to admin panel...');
  }

  navigateToDebtManagement() {
    // Navigate to debt management
    console.log('Navigating to debt management...');
  }

  navigateToExternalServices() {
    // Navigate to external services
    console.log('Navigating to external services...');
  }
}

