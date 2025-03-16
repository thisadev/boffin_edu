# Boffin Institute of Data Science - Website

Modern, scalable website for Boffin Institute of Data Science (www.boffin.edu.lk) featuring course catalog, student registration system, and payment processing.

## Latest Deployment: March 17, 2025

## Project Setup Documentation

This document outlines the complete setup process for the Boffin Institute website project, including all terminal commands used.

### Prerequisites

Before starting, ensure you have the following installed:
- Node.js v18 or higher (we're using v18.20.7)
- npm v10 or higher (we're using v10.8.2)
- Git (we're using v2.44.0)

You can check your versions with:
```bash
node -v
npm -v
git --version
```

### Step 1: Repository Setup

```bash
# Clone the repository
git clone https://github.com/thisadev/boffin_edu.git
cd boffin_edu
```

### Step 2: Project Initialization

```bash
# Initialize package.json
npm init -y

# Install Next.js and React
npm install next@latest react@latest react-dom@latest

# Install TypeScript and other dependencies
npm install typescript @types/react @types/node @types/react-dom eslint eslint-config-next tailwindcss postcss autoprefixer @prisma/client next-auth stripe @vercel/postgres

# Install Tailwind CSS PostCSS plugin (required for Tailwind CSS v4+)
npm install --save-dev @tailwindcss/postcss

# Install development dependencies
npm install -D prisma
```

### Step 3: Configuration Files Setup

Create the following configuration files:

#### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Tailwind CSS Configuration (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#1a202c',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

#### Tailwind CSS v4 Configuration (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

#### CSS Variables for Custom Colors (src/styles/globals.css)
```css
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
  --color-primary: 0, 112, 243; /* #0070f3 in RGB */
  --color-secondary: 26, 32, 44; /* #1a202c in RGB */
}
```

#### PostCSS Configuration (postcss.config.js)
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### Step 4: Project Structure Setup

```bash
# Create project directories
mkdir -p src/app src/components src/lib src/styles public
```

### Step 5: Create Basic Application Files

#### Global CSS (src/styles/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition-colors;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

#### Root Layout (src/app/layout.tsx)
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boffin Institute of Data Science',
  description: 'Learn data science from industry experts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

#### Home Page (src/app/page.tsx)
```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to Boffin Institute of Data Science
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.boffin.edu.lk"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Boffin Institute
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold text-center">Boffin Institute of Data Science</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <Link
          href="/courses"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Courses{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore our data science courses and programs.
          </p>
        </Link>

        <Link
          href="/register"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Register{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Register for our upcoming courses and programs.
          </p>
        </Link>

        <Link
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            About Us{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn more about Boffin Institute and our mission.
          </p>
        </Link>
      </div>
    </main>
  );
}
```

### Step 6: Database Setup with Prisma

```bash
# Initialize Prisma
npx prisma init
```

Edit the `prisma/schema.prisma` file to define your database schema for courses and registrations.

### Step 7: Running the Development Server

```bash
# Start the development server
npm run dev
```

Visit http://localhost:3000 to see your application.

### Step 8: Deployment to Vercel

1. Create a Vercel account if you don't have one
2. Install Vercel CLI: `npm install -g vercel`
3. Deploy to Vercel: `vercel`

### Step 9: Testing Environment Setup

The project includes a comprehensive testing setup with multiple testing layers to ensure quality and reliability.

#### Installing Testing Dependencies

```bash
# Install Jest and React Testing Library for unit and component testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @testing-library/user-event @types/jest

# Install Cypress for end-to-end testing
npm install --save-dev cypress

# Install Mock Service Worker for API mocking
npm install --save-dev msw

# Install utilities for testing Next.js routing and API routes
npm install --save-dev next-router-mock node-mocks-http

# Install utility for running end-to-end tests with a development server
npm install --save-dev start-server-and-test
```

#### Configuration Files

Create the following configuration files for testing:

**Jest Configuration (jest.config.js)**
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

**Jest Setup (jest.setup.js)**
```javascript
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => require('next-router-mock/next-navigation'));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  if (typeof window !== 'undefined') {
    // Clean up any global variables or mocks
  }
});
```

**Cypress Configuration (cypress.config.js)**
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
  },
});
```

#### Test Directory Structure

```bash
# Create test directories
mkdir -p src/__tests__/components src/__tests__/pages src/__tests__/api cypress/e2e
```

#### Running Tests

The following npm scripts are available for running tests:

```bash
# Run all Jest tests once
npm test

# Run Jest tests in watch mode (useful during development)
npm run test:watch

# Generate a detailed coverage report
npm run test:coverage

# Open Cypress test runner in interactive mode
npm run cypress

# Run Cypress tests in headless mode
npm run cypress:headless

# Start the development server and run Cypress tests
npm run e2e

# Start the development server and run Cypress tests in headless mode
npm run e2e:headless
```

#### Test Examples

**Unit Test Example (src/__tests__/pages/HomePage.test.tsx)**
```tsx
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    
    const heading = screen.getByText('Boffin Institute of Data Science');
    expect(heading).toBeInTheDocument();
  });

  it('renders the course link', () => {
    render(<Home />);
    
    const courseLink = screen.getByRole('link', { 
      name: (content) => content.includes('Courses') && content.includes('Explore our data science courses') 
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', '/courses');
  });
});
```

**API Test Example (src/__tests__/api/courses.test.ts)**
```typescript
import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';

// Example API handler test
describe('/api/courses', () => {
  test('returns a list of courses', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    // Call your API handler here
    // await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
  });
});
```

**End-to-End Test Example (cypress/e2e/home.cy.js)**
```javascript
describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000');
  });

  it('displays the main heading', () => {
    cy.contains('h1', 'Boffin Institute of Data Science').should('be.visible');
  });

  it('navigates to courses page when courses link is clicked', () => {
    cy.contains('Courses').click();
    cy.url().should('include', '/courses');
  });
});
```

## Infrastructure & Technology Stack

### Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Next.js        │────▶│  Vercel         │────▶│  Vercel         │
│  Frontend       │     │  Serverless     │     │  Postgres       │
│                 │     │  Functions      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Stripe         │     │  Email          │     │  Authentication │
│  Payment        │     │  Service        │     │  (NextAuth.js) │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Technology Layers

#### 1. Frontend Layer
- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **State Management**: React Context API / SWR for data fetching
- **Deployment**: Vercel

#### 2. Backend Layer
- **API Routes**: Next.js API Routes (Serverless Functions)
- **Authentication**: NextAuth.js
- **Email Service**: SendGrid/Resend

#### 3. Database Layer
- **Database**: Vercel Postgres (PostgreSQL)
- **ORM**: Prisma

#### 4. Payment Processing
- **Payment Gateway**: Stripe
- **Alternative**: Local payment gateway integration

#### 5. DevOps & Deployment
- **Hosting**: Vercel
- **CI/CD**: Vercel + GitHub Actions
- **Monitoring**: Vercel Analytics

## Project Structure

```
├── components/         # Reusable UI components
├── lib/               # Utility functions and shared code
├── pages/             # Next.js pages and API routes
│   ├── api/           # Backend API endpoints
│   └── ...            # Frontend pages
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── styles/            # Global styles
└── ...                # Configuration files
```

## Features

- **Course Catalog**: Browse and search available courses
- **Student Registration**: Online registration form
- **Payment Processing**: Secure payment via Stripe
- **Admin Dashboard**: Manage courses and registrations
- **Responsive Design**: Mobile-friendly interface

## License

[MIT](LICENSE)