# replit.md

## Overview

This is a full-stack store builder application built with Express.js, React, and PostgreSQL. The system allows admins to create store templates and enables store owners to create customized online stores for various business types (ice cream shops, açaí stores, cafés, etc.). The application includes both administrative functionality and customer-facing store previews with shopping cart integration.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks and TanStack Query for server state
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Structure**: RESTful endpoints for templates, stores, products, orders, and analytics
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite integration

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database interface
│   └── vite.ts            # Development server setup
├── shared/                 # Shared TypeScript types and schemas
└── migrations/            # Database migrations
```

## Key Components

### Database Schema (PostgreSQL)
- **users**: Admin and store owner accounts with role-based access
- **store_templates**: Predefined templates for different business types
- **stores**: Individual store instances with customization options
- **products**: Store inventory management
- **orders**: Customer order tracking
- **analytics**: Business performance metrics

### API Endpoints
- `/api/templates` - Store template management
- `/api/stores` - Store CRUD operations
- `/api/products` - Product management
- `/api/orders` - Order processing
- `/api/analytics` - Business metrics

### Frontend Pages
- **Landing Page**: Marketing page with navigation to different panels
- **Admin Panel**: Template management and site administration
- **Store Panel**: Store owner dashboard for managing products and orders
- **Preview Site**: Customer-facing store with shopping cart functionality

### Key Features
- Template-based store creation with category-specific designs
- Real-time shopping cart with WhatsApp integration for orders
- PIX payment integration for Brazilian market
- Responsive design with mobile optimization
- Visual editor for store customization
- Analytics dashboard for business insights

## Data Flow

1. **Store Creation**: Admin selects template → Store owner customizes → Store goes live
2. **Customer Journey**: Browse products → Add to cart → Send order via WhatsApp → Payment via PIX
3. **Order Management**: Store owner receives orders → Updates status → Tracks analytics
4. **Template Management**: Admin creates/updates templates → Available for new stores

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL for serverless database hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives for accessible components
- **State Management**: TanStack Query for server state synchronization
- **Styling**: Tailwind CSS for utility-first styling

### Integration Services
- **WhatsApp Business API**: Order communication and customer support
- **PIX**: Brazilian instant payment system integration
- **Image Hosting**: External service for product and template images (Unsplash for demo)

### Development Tools
- **TypeScript**: Full-stack type safety
- **Vite**: Fast development server and build tool
- **ESBuild**: Production bundling for server code
- **Replit**: Development environment integration

## Deployment Strategy

### Development Environment
- Vite development server with HMR for frontend
- Express server with TypeScript compilation via tsx
- Database migrations managed through Drizzle Kit
- Environment variables for database connection and API keys

### Production Build
- Frontend built with Vite to static assets
- Backend bundled with ESBuild for Node.js runtime
- PostgreSQL database with connection pooling
- Static asset serving through Express

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- Replit-specific configurations for development

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup