import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingComponent],
  template: `
    <div class="app-container">
      <app-loading *ngIf="isLoading"></app-loading>
      <router-outlet *ngIf="!isLoading"></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'sacco-auth-app';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // Wait a moment for Keycloak to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (this.authService.isAuthenticated()) {
        // User is authenticated, navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // User is not authenticated, navigate to login
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error during app initialization:', error);
      this.router.navigate(['/login']);
    } finally {
      this.isLoading = false;
    }
  }
}

