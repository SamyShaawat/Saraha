# Saraha

Saraha is a modern anonymous messaging web application that enables users to receive open and honest feedback from friends, family, and colleagues in a private and secure manner.

## 🚀 Technology Stack

This repository is structured as an [Nx workspace](https://nx.dev) monorepo.

*   **Frontend framework**: React (Next.js/Vite integrated via Nx)
*   **Backend framework**: NestJS
*   **Database ORM**: Prisma Client
*   **Database Engine**: PostgreSQL
*   **Package Manager**: pnpm

## 📁 Repository Structure

*   `/apps/frontend`: Web application client interface featuring modern glassmorphism aesthetics.
*   `/apps/backend`: Central NestJS server managing user authentication, sessions, and Prisma database synchronization.
*   `/libs`: Shared architectural boundaries and packages (DTOs, Data Access repositories, Utility functions).
*   `/prisma`: Database schema layout and TypeScript-based `seed.ts` migration fixtures.

## 💻 Setup and Usage

Before you begin, ensure you have an active PostgreSQL service running locally or in Docker.

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure Database Schema:**
   *(Ensure you have setup your `.env` with a `DATABASE_URL`)*
   ```bash
   pnpm exec prisma db push
   ```

3. **Populate Mock Seed Data:**
   ```bash
   pnpm exec prisma db seed
   # Generates test users such as jane.doe@example.com
   ```

4. **Launch Backend Service:**
   ```bash
   pnpm nx serve backend
   ```
   *(Running locally on http://localhost:3000/api)*

5. **Launch Frontend Service:**
   ```bash
   pnpm nx serve frontend
   ```
   *(Running locally on http://localhost:4200)*

## 🛠 Features Included

*   Complete `libs/` boundary scaffolding to prevent circular dependency conflicts.
*   Type-safe endpoints ensuring backend logic syncs explicitly with identical React models.
*   Nx Executor optimized builds, with fixed configurations to properly watch Webpack cycles.
*   JWT and Argon2 Hash encrypted identity workflows.
