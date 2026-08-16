# Phase 1: Shell & Layout System

## 1. Overview & Objectives
The goal of Phase 1 was to establish the foundation of the web application. This involved setting up Tailwind CSS v4 alongside Angular Material, centralizing Material module imports, building a responsive and accessible application shell (Header Navbar, Navigation Sidebar, and Container Layout), and configuring standard root routing.

## 2. File Directory & Created Components
Below is the list of files added or modified during this phase:

```text
src/app/
├── shared/
│   └── shared-material.module.ts       # Centralized Angular Material imports
├── layout/
│   ├── navbar/                         # Header top bar (User menu, branding, dark mode toggle slot)
│   │   ├── navbar.component.ts
│   │   ├── navbar.component.html
│   │   └── navbar.component.scss
│   ├── sidebar/                        # Collapsible dark navigation drawer
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── sidebar.component.scss
│   └── main-layout/                    # Master layout wrapper housing navbar, drawer, & main router-outlet
│       ├── main-layout.component.ts
│       ├── main-layout.component.html
│       └── main-layout.component.scss
├── features/
│   └── users/
│       └── users.component.ts          # Feature routing target placeholder
├── app.component.html                  # Cleared to host only <router-outlet>
├── app.component.ts                    # Updated root component
├── app.routes.ts                       # App routing tree configuration
└── styles.scss                         # Material theme & Tailwind CSS imports