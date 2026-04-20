# SubScribe - Subscription Management Dashboard

## Problem Statement

People often lose track of their recurring subscriptions across entertainment, productivity, cloud, and other services. This leads to unnecessary monthly spending and poor visibility into total yearly costs.

This project solves that by providing a single dashboard to:
- Add and manage subscriptions
- Monitor monthly and annual spending
- Visualize category-wise cost distribution
- Track cancellation impact through a savings view

## Features

- Email/password authentication using Firebase Authentication
- Login and Sign Up entry screen
- Add and edit subscription details
- Cancel subscriptions and move them to archive
- Dashboard metrics for:
  - Monthly burn
  - Annual burn
  - Savings pot from cancelled subscriptions
- Pie chart analytics for category-wise monthly breakdown
- Persistent data storage in browser localStorage
- INR-only currency display for all amounts
- Responsive UI built with Tailwind CSS

## Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- State Management: Zustand
- Charts: Recharts
- Authentication: Firebase Authentication
- Build Tool: Vite
- Package Manager: npm

## Setup Instructions

### 1) Clone and open project

```bash
git clone <your-repo-url>
cd SUBSCRIPTION
```

### 2) Install dependencies

```bash
npm install
```

### 3) Firebase configuration

Firebase app configuration is already added in `src/firebase.js`.

Make sure you enable Email/Password auth in Firebase Console:
- Go to Firebase Console -> Authentication -> Sign-in method
- Enable **Email/Password**

### 4) Run development server

```bash
npm run dev
```

Default local URL:
- `http://localhost:5173`

### 5) Build for production

```bash
npm run build
```

### 6) Preview production build

```bash
npm run preview
```

