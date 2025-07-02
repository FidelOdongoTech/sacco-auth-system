# Sacco Debt Management System - Authentication & Authorization

A complete authentication and authorization system built with **Keycloak** and **Angular** for a Sacco (Savings and Credit Cooperative) debt management system. This solution provides secure user authentication, role-based access control, and production-ready code structure.

## 🏗️ Architecture Overview

The system consists of two main components:

1. **Keycloak Server** - Identity and Access Management (IAM) server
2. **Angular Frontend** - Single Page Application (SPA) with authentication integration

### Key Features

- ✅ **Secure Authentication** - OAuth 2.0 / OpenID Connect via Keycloak
- ✅ **Role-Based Access Control** - Three distinct user roles (Admin, Debt Officer, External Agent)
- ✅ **JWT Token Management** - Automatic token refresh and expiry handling
- ✅ **Route Protection** - Angular guards for securing application routes
- ✅ **Production Ready** - Clean, scalable code structure with proper error handling
- ✅ **Responsive Design** - Mobile-friendly user interface
- ✅ **Docker Support** - Easy deployment with Docker Compose

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ and npm
- Angular CLI

### 1. Start Keycloak Server

```bash
# Start Keycloak using Docker
docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

### 2. Configure Keycloak

1. Open http://localhost:8080 in your browser
2. Login with admin/admin
3. Create a new realm called "SaccoRealm"
4. Create three roles: Admin, Debt Officer, External Agent
5. Create a client called "sacco-app" with these settings:
   - Client Type: OpenID Connect
   - Valid Redirect URIs: http://localhost:4200/*
   - Web Origins: http://localhost:4200

### 3. Run Angular Application

```bash
# Install dependencies
cd sacco-auth-app
npm install

# Start development server
ng serve

# Or build for production
ng build
```

## 📁 Project Structure

```
sacco-auth-app/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── login/           # Login page
│   │   │   ├── dashboard/       # Main dashboard
│   │   │   ├── unauthorized/    # Access denied page
│   │   │   └── loading/         # Loading spinner
│   │   ├── guards/              # Route Guards
│   │   │   ├── auth.guard.ts    # Authentication guard
│   │   │   └── role.guard.ts    # Role-based guard
│   │   ├── services/            # Business Logic
│   │   │   └── auth.service.ts  # Authentication service
│   │   ├── interceptors/        # HTTP Interceptors
│   │   │   └── auth.interceptor.ts # JWT token interceptor
│   │   ├── keycloak.config.ts   # Keycloak configuration
│   │   ├── app.routes.ts        # Application routes
│   │   └── app.config.ts        # App configuration
│   └── styles.scss              # Global styles
├── docker-compose.yml           # Docker Compose for Keycloak
└── README.md                    # This file
```

## 🔐 Security Features

### Authentication Flow

1. **Initial Load**: App checks if user is authenticated
2. **Unauthenticated**: Redirects to Keycloak login page
3. **Authentication**: User logs in via Keycloak
4. **Token Handling**: JWT tokens are automatically managed
5. **Route Protection**: Guards prevent unauthorized access

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, all features |
| **Debt Officer** | Debt management, customer records, reporting |
| **External Agent** | Limited access, external service integration |

### Token Management

- **Automatic Refresh**: Tokens are refreshed before expiry
- **Secure Storage**: Tokens handled by Keycloak Angular adapter
- **HTTP Interceptor**: Automatically adds Bearer token to API requests
- **Logout Handling**: Proper cleanup on user logout

## 🎨 User Interface

### Login Page
- Clean, professional design
- Keycloak integration
- Loading states and error handling

### Dashboard
- User profile information
- Role-based feature visibility
- Quick action buttons
- Responsive layout

### Unauthorized Page
- Clear error messaging
- User role information
- Navigation options

## 🛠️ Development

### Adding New Routes

```typescript
// In app.routes.ts
{
  path: 'new-feature',
  loadComponent: () => import('./components/new-feature/new-feature.component'),
  canActivate: [RoleGuard],
  data: { roles: ['Admin'] } // Specify required roles
}
```

### Creating Role-Protected Components

```typescript
// In your component
constructor(public authService: AuthService) {}

// Check permissions in template
<div *ngIf="authService.isAdmin()">
  Admin only content
</div>
```

### API Integration

The HTTP interceptor automatically adds JWT tokens to requests:

```typescript
// No manual token handling needed
this.http.get('/api/protected-endpoint').subscribe(data => {
  // Token automatically included in Authorization header
});
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
ng build --configuration production

# Serve with any web server
# Files will be in dist/sacco-auth-app/browser/
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access Keycloak at http://localhost:8080
# Deploy Angular app to your preferred hosting service
```

### Environment Configuration

Update `src/app/keycloak.config.ts` for different environments:

```typescript
export const keycloakConfig: KeycloakConfig = {
  url: 'https://your-keycloak-server.com', // Production Keycloak URL
  realm: 'SaccoRealm',
  clientId: 'sacco-app'
};
```

## 🧪 Testing

### Test Users

Create test users in Keycloak with different roles:

| Username | Password | Role |
|----------|----------|------|
| admin_user | password | Admin |
| debt_officer | password | Debt Officer |
| external_agent | password | External Agent |

### Testing Authentication Flow

1. Navigate to the application
2. Should redirect to Keycloak login
3. Login with test credentials
4. Should redirect back to dashboard
5. Verify role-based access to features

## 🔧 Troubleshooting

### Common Issues

**Keycloak Connection Error**
- Ensure Keycloak is running on port 8080
- Check firewall settings
- Verify realm and client configuration

**CORS Issues**
- Add your domain to Keycloak client's "Web Origins"
- Ensure "Valid Redirect URIs" includes your app URL

**Token Expiry**
- Tokens are automatically refreshed
- Check browser console for refresh errors
- Verify Keycloak session settings

### Debug Mode

Enable debug logging in `app.config.ts`:

```typescript
initOptions: {
  onLoad: 'check-sso',
  enableLogging: true // Enable for debugging
}
```

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Angular Documentation](https://angular.io/docs)
- [Keycloak Angular Adapter](https://github.com/mauriciovigolo/keycloak-angular)
- [OAuth 2.0 / OpenID Connect](https://oauth.net/2/)

## 🤝 Support

For technical support or questions about this implementation:

1. Check the troubleshooting section above
2. Review Keycloak and Angular documentation
3. Verify configuration settings match the setup guide

## 📄 License

This project is provided as-is for educational and development purposes. Please ensure compliance with your organization's security policies before deploying to production.

---

**Built with ❤️ for Sacco Debt Management System**

