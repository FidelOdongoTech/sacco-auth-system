import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Sacco Debt Management System</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <div class="login-content">
          <button 
            class="login-btn" 
            (click)="login()"
            [disabled]="isLoading">
            <span *ngIf="!isLoading">Sign In with Keycloak</span>
            <span *ngIf="isLoading" class="loading-spinner">
              <span class="spinner"></span>
              Signing in...
            </span>
          </button>
        </div>
        
        <div class="login-footer">
          <p>Secure authentication powered by Keycloak</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 400px;
      width: 100%;
      text-align: center;
    }

    .login-header h1 {
      color: #333;
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 600;
    }

    .login-header p {
      color: #666;
      margin-bottom: 32px;
      font-size: 14px;
    }

    .login-btn {
      width: 100%;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .login-btn:hover:not(:disabled) {
      background: #4338ca;
      transform: translateY(-1px);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .loading-spinner {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .login-footer {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }

    .login-footer p {
      color: #9ca3af;
      font-size: 12px;
      margin: 0;
    }
  `]
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  async login() {
    try {
      this.isLoading = true;
      await this.authService.login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

