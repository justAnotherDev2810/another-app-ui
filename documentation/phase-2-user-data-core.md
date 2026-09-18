# Phase 2: User Data Core & Signal State Management

## 1. Overview & Objectives
Phase 2 focused on establishing the core user domain model, configuring endpoint constants, managing reactive state using Angular Signals, connecting mock/API operations, and implementing global feedback notifications via Angular Material Snackbars.

## 2. Created & Updated Files
```text
src/app/
├── core/
│   ├── constants/
│   │   └── api-endpoints.constants.ts    # Centralized REST API endpoint mapping
│   ├── models/
│   │   └── user.model.ts                 # Enforced domain model (User, UserRole, UserStatus)
│   ├── data/
│   │   └── mock-users.data.ts            # Baseline mock user records
│   └── services/
│       ├── user.service.ts               # Signal-based user state management
│       └── notification.service.ts       # Reusable Material Snackbar service (Success/Error/Warning)
├── features/
│   └── users/
│       ├── add-user-dialog/              # Reactive Form dialog for user creation
│       │   ├── add-user-dialog.component.ts
│       │   ├── add-user-dialog.component.html
│       │   └── add-user-dialog.component.scss
│       ├── users.component.ts            # Table display & direct action triggers
│       └── users.component.html
├── environments/
│   ├── environment.ts                    # Dev environment configuration (http://localhost:8080/api/v1)
│   └── environment.prod.ts               # Production environment configuration
└── styles.scss                           # Custom color overrides for Material Snackbar toasts      