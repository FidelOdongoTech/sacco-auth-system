import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="error-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
            <path d="M15 9l-6 6" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 9l6 6" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <h1>Access Denied</h1>
        <p class="error-message">
          You don't have the required permissions to access this resource.
        </p>
        
        <div class="user-info" *ngIf="username">
          <p><strong>Current User:</strong> {{ username }}</p>
          <p><strong>Your Roles:</strong> 
            <span *ngIf="userRoles.length > 0">{{ userRoles.join(', ') }}</span>
            <span *ngIf="userRoles.length === 0" class="no-roles">No roles assigned</span>
          </p>
        </div>
        
        <div class="actions">
          <button class="btn btn-primary" (click)="goToDashboard()">
            Go to Dashboard
          </button>
          <button class="btn btn-secondary" (click)="logout()">
            Logout
          </button>
        </div>
        
        <div class="help-text">
          <p>If you believe this is an error, please contact your system administrator.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      padding: 20px;
    }

    .unauthorized-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .error-icon {
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
    }

    h1 {
      color: #dc2626;
      margin-bottom: 16px;
      font-size: 28px;
      font-weight: 600;
    }

    .error-message {
      color: #374151;
      margin-bottom: 24px;
      font-size: 16px;
      line-height: 1.5;
    }

    .user-info {
      background: #f9fafb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      text-align: left;
    }

    .user-info p {
      margin: 8px 0;
      color: #374151;
      font-size: 14px;
    }

    .user-info strong {
      color: #111827;
    }

    .no-roles {
      color: #9ca3af;
      font-style: italic;
    }

    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
    }

    .btn-primary:hover {
      background: #4338ca;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
      transform: translateY(-1px);
    }

    .help-text {
      border-top: 1px solid #e5e7eb;
      padding-top: 16px;
    }

    .help-text p {
      color: #6b7280;
      font-size: 12px;
      margin: 0;
    }

    @media (max-width: 480px) {
      .unauthorized-card {
        padding: 24px;
      }

      .actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class UnauthorizedComponent {
  username: string | undefined;
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.username = this.authService.getUsername();
    this.userRoles = this.authService.getUserRoles();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

