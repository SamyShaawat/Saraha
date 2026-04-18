# 🌿 Saraha - Anonymous Messaging Platform

[![Nx](https://img.shields.io/badge/Nx-Monorepo-blueviolet?style=flat-square&logo=nx)](https://nx.dev)
[![NestJS](https://img.shields.io/badge/NestJS-Framework-red?style=flat-square&logo=nestjs)](https://nestjs.com)
[![React](https://img.shields.io/badge/React-UI-blue?style=flat-square&logo=react)](https://reactjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://postgresql.org)

**Saraha** is a premium, modern anonymous messaging application designed for honest feedback and private communication. Built with a robust full-stack architecture, it offers a seamless and secure experience for users to connect and share insights.

---

## ✨ Features

- **🔒 Privacy First**: Secure, anonymous messaging with encrypted identity workflows.
- **🎨 Modern UI/UX**: Stunning frontend with glassmorphism aesthetics and responsive design.
- **🏗 Monorepo Architecture**: Managed by Nx for efficient builds and shared library management.
- **🛡 Type-Safe**: Shared DTOs and utilities ensure end-to-end type safety between Backend and Frontend.
- **🔑 Secure Auth**: JWT-based authentication with Argon2 password hashing and Google Social Auth support.
- **📊 Database Management**: High-performance PostgreSQL with Prisma ORM and automated seeding.

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Monorepo** | [Nx](https://nx.dev) |
| **Frontend** | [React](https://reactjs.org), [Vite](https://vitejs.dev), [React Router](https://reactrouter.com) |
| **Backend** | [NestJS](https://nestjs.com), [Express](https://expressjs.com) |
| **Database** | [PostgreSQL](https://www.postgresql.org), [Prisma](https://www.prisma.io) |
| **Security** | JWT, Argon2, [google-auth-library](https://www.npmjs.com/package/google-auth-library) |
| **Tooling** | [pnpm](https://pnpm.io), ESLint, Prettier, Jest |

---

## 📁 Project Structure

```bash
Saraha/
├── apps/
│   ├── frontend/         # React SPA (Vite-based)
│   ├── backend/          # NestJS API Server
│   └── backend-e2e/      # End-to-end testing suite
├── libs/
│   ├── dto/              # Shared Data Transfer Objects
│   └── utils/            # Shared utilities and constants
├── prisma/               # Database schema and seed scripts
└── package.json          # Workspace dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) instance

### Configuration

Create a `.env` file in the root directory and configure the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saraha_db?schema=public"

# Server
PORT=3008

# Security
JWT_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
JWT_EXPIRE="1h"
REFRESH_TOKEN_EXPIRE="7d"

# Social Auth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
```

### Installation

1. **Clone and Install:**
   ```bash
   pnpm install
   ```

2. **Database Setup:**
   ```bash
   pnpm exec prisma db push
   pnpm run prisma:seed
   ```

3. **Run Services:**
   
   **Development Mode (Frontend + Backend):**
   ```bash
   pnpm run dev
   ```
   
   **Individual Services:**
   - **Frontend:** `pnpm run dev:frontend` (http://localhost:4208)
   - **Backend:** `pnpm run dev:backend` (http://localhost:3008)

---

## 📜 Available Scripts

| Task | Command |
| :--- | :--- |
| **Start All** | `pnpm run dev` |
| **Build Project** | `pnpm run build` |
| **Run Tests** | `pnpm run test` |
| **Linting** | `pnpm run lint` |
| **Prisma Studio** | `pnpm run prisma:studio` |
| **Prisma Migrate** | `pnpm run prisma:migrate` |

---

## 🛡 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ for a better feedback culture.
</p>
