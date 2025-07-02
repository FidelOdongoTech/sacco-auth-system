import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div class="loading-content">
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
        <h2>Loading...</h2>
        <p>Please wait while we authenticate your session</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
      padding: 40px;
    }

    .spinner-container {
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #4f46e5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    h2 {
      color: #1e293b;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    p {
      color: #64748b;
      font-size: 14px;
      margin: 0;
    }
  `]
})
export class LoadingComponent {}

