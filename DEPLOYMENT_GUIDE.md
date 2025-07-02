# Deployment Guide - Sacco Authentication System

## 🚀 Production Deployment Steps

### Step 1: Keycloak Server Setup

#### Option A: Docker Deployment (Recommended)

```bash
# Create production docker-compose.yml
version: '3.8'
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    container_name: keycloak-prod
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: your-secure-password
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: your-db-password
      KC_HOSTNAME: your-keycloak-domain.com
      KC_HTTPS_CERTIFICATE_FILE: /opt/keycloak/conf/server.crt.pem
      KC_HTTPS_CERTIFICATE_KEY_FILE: /opt/keycloak/conf/server.key.pem
    ports:
      - "8080:8080"
      - "8443:8443"
    volumes:
      - ./certs:/opt/keycloak/conf
    depends_on:
      - postgres
    command: start

  postgres:
    image: postgres:15
    container_name: keycloak-db
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: your-db-password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Option B: Manual Installation

1. Download Keycloak from https://www.keycloak.org/downloads
2. Configure database (PostgreSQL recommended for production)
3. Set up SSL certificates
4. Configure hostname and ports

### Step 2: Keycloak Configuration

1. **Access Admin Console**
   - Navigate to https://your-keycloak-domain.com:8443
   - Login with admin credentials

2. **Create Production Realm**
   ```
   Realm Name: SaccoRealm
   Display Name: Sacco Debt Management
   Enabled: ON
   ```

3. **Configure Realm Settings**
   - Login Tab:
     - User registration: OFF (for security)
     - Forgot password: ON
     - Remember me: ON
   - Tokens Tab:
     - Access Token Lifespan: 5 minutes
     - Refresh Token Max Reuse: 0
     - SSO Session Idle: 30 minutes

4. **Create Client**
   ```
   Client ID: sacco-app
   Client Type: OpenID Connect
   Standard Flow: ON
   Direct Access Grants: ON
   Valid Redirect URIs: https://your-app-domain.com/*
   Web Origins: https://your-app-domain.com
   ```

5. **Create Roles**
   - Admin
   - Debt Officer  
   - External Agent

6. **Create Users and Assign Roles**

### Step 3: Angular Application Deployment

#### Update Configuration

1. **Update Keycloak Config** (`src/app/keycloak.config.ts`):
   ```typescript
   export const keycloakConfig: KeycloakConfig = {
     url: 'https://your-keycloak-domain.com:8443',
     realm: 'SaccoRealm',
     clientId: 'sacco-app'
   };
   ```

2. **Build for Production**:
   ```bash
   ng build --configuration production
   ```

#### Deployment Options

**Option A: Static Hosting (Netlify, Vercel, AWS S3)**
```bash
# Build the app
ng build --configuration production

# Deploy dist/sacco-auth-app/browser/ folder
# Configure redirects for SPA routing
```

**Option B: Nginx Server**
```nginx
server {
    listen 443 ssl;
    server_name your-app-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/sacco-auth-app;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

**Option C: Docker Container**
```dockerfile
FROM nginx:alpine
COPY dist/sacco-auth-app/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 4: Security Considerations

#### SSL/TLS Configuration
- Use valid SSL certificates (Let's Encrypt recommended)
- Configure HTTPS redirects
- Set secure headers

#### Keycloak Security
- Change default admin password
- Enable database encryption
- Configure session timeouts
- Set up backup procedures

#### Application Security
- Enable Content Security Policy (CSP)
- Configure CORS properly
- Use environment variables for sensitive config
- Implement proper error handling

### Step 5: Monitoring and Maintenance

#### Health Checks
```bash
# Keycloak health check
curl https://your-keycloak-domain.com:8443/health

# Application health check
curl https://your-app-domain.com
```

#### Backup Procedures
- Database backups (automated)
- Configuration backups
- SSL certificate renewal

#### Log Monitoring
- Keycloak logs: `/opt/keycloak/data/log/`
- Application logs: Browser console, server logs
- Security events: Failed logins, token issues

## 🔧 Environment-Specific Configurations

### Development
```typescript
// keycloak.config.ts
export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'SaccoRealm',
  clientId: 'sacco-app'
};
```

### Staging
```typescript
// keycloak.config.ts
export const keycloakConfig: KeycloakConfig = {
  url: 'https://staging-keycloak.your-domain.com',
  realm: 'SaccoRealm',
  clientId: 'sacco-app'
};
```

### Production
```typescript
// keycloak.config.ts
export const keycloakConfig: KeycloakConfig = {
  url: 'https://keycloak.your-domain.com',
  realm: 'SaccoRealm',
  clientId: 'sacco-app'
};
```

## 📋 Pre-Deployment Checklist

- [ ] SSL certificates configured
- [ ] Database backup strategy in place
- [ ] Keycloak admin password changed
- [ ] Production realm configured
- [ ] Client settings verified
- [ ] User roles and permissions tested
- [ ] Angular app built for production
- [ ] Environment configurations updated
- [ ] Security headers configured
- [ ] Monitoring and logging set up
- [ ] Health checks implemented
- [ ] Documentation updated

## 🚨 Troubleshooting

### Common Production Issues

**CORS Errors**
- Verify Web Origins in Keycloak client
- Check redirect URIs
- Ensure protocol matches (HTTP/HTTPS)

**SSL Certificate Issues**
- Verify certificate chain
- Check certificate expiry
- Ensure proper domain configuration

**Database Connection Issues**
- Check database credentials
- Verify network connectivity
- Review connection pool settings

**Performance Issues**
- Monitor database performance
- Check Keycloak memory usage
- Review session timeout settings

## 📞 Support Contacts

- **System Administrator**: [Your contact info]
- **Development Team**: [Your contact info]
- **Security Team**: [Your contact info]

---

**Last Updated**: [Current Date]
**Version**: 1.0.0

